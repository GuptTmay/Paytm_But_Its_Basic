    const express = require("express");
    const { authMiddleware } = require("../middleware");
    const { User } = require("../db");
    const userRoute = require("./user");
    const accountRoute = require("./account");
    
    const router = new express.Router();

    router.use("/user/", userRoute);
    router.use("/account/", authMiddleware, accountRoute);

    router.get('/', authMiddleware, async (req, res) => {
        const userInfo = await User.findById(req.userId);
        
        return res.status(200).json({
            message: "Success",
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
        })
    }) 

module.exports = router;
