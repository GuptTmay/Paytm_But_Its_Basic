const express = require("express");
const { User, Account, conn } = require("../db");
const { userSchemaTranfer } = require("../types");
const router = new express.Router();

router.get("/balance", async (req, res) => {
    const account = await Account.findOne({userId: req.userId});

    return res.status(200).json({
        balance: account.balance,
    });
})

// Transfering money from current users bank to another 
router.post("/transfer", async (req, res) => {
    const { success, data, error } = userSchemaTranfer.safeParse(req.body);
    if (!success) {
        console.log(data);
        console.log(error);
        return res.status(411).json({
            message: "Invaild Transfer request! Try Again",
        });
    }

    const userTo = await Account.findOne({userId: req.body.to});
    const userFrom = await Account.findOne({userId: req.userId});
    // console.log(userTo);
    // console.log(userFrom);
    if (userFrom === null || userTo === null) {
        return res.status(400).json({
            message: "Invalid account! The account you are transfering your money to does not exists",
        });
    }

    if (req.body.amount > userFrom.balance) {
        return res.status(400).json({
            message: "Your Account has Insufficient balance",
        });
    }

    const session = await conn.startSession();
    try {
        session.startTransaction();    
        const amount = req.body.amount;
        await Account.findByIdAndUpdate(userFrom, {$inc: {balance: -amount}}, { session });
        await Account.findByIdAndUpdate(userTo, {$inc: {balance: amount}}, { session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        return res.status(400).json({
            message: "Transfer Unsuccessfull",
        });
    }

    await session.endSession();
    return res.status(200).json({
        message: "Transfer successful",
    });
});

module.exports = router;
