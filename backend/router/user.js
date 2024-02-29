const { z } = require("zod");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const { saltRounds, JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { userSchemaSignup, userSchemaSignin, userSchemaStrict, userSchemaBulk } = require("../types");
const { authMiddleware } = require("../middleware");

/*
sample body
{
	username: "name@gmail.com",
	firstName: "name",
	lastName: "name",
	password: "123456"
}
*/

// Used to edit user information 
router.put("/", authMiddleware, async (req, res) => {
    const result = userSchemaStrict.safeParse(req.body);
    if (!result.success) {
        console.log(result.error);
        return res.status(411).json({
            message: "Error while updating information",
        });
    }

    let update = req.body;
    if (req.body.hasOwnProperty("password")) {

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        update.password = hashedPassword;
    }


    await User.findOneAndUpdate({ _id: req.userId }, update);

    res.status(200).json({
        message: "Updated successfully"
    });
})

router.post("/signup", async (req, res) => {

    try {

        const { success, error } = userSchemaSignup.safeParse(req.body);

        if (!success) {
            return res.status(411).json({
                message: "Incorrect " + error.issues[0].path[0] + ": " + error.issues[0].message,
            });
        }
    
        const existingUser = await User.findOne({username: req.body.username});
        
        if (existingUser) {   
            // User with the same username already exists
            return res.status(411).json({
                message: "This email is already registered. Please Check for spellings Mistakes",
            });
        }        
        
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        await Account.create({
            userId: user._id,
            balance: Math.floor((Math.random() * 10000) % 10000),
        })

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    
        return res.status(200).json({
            message: "User created successfully",
            token: token,
        }) 

    } catch (error) {
        console.log("Error during signingup user: ", error);
        return res.status(500).json({
            message: "Internal server error Try Again Please!",
        });
    }
})


router.post("/signin", async (req, res) => {

    try {
        const { success, error } = userSchemaSignin.safeParse(req.body);
        
        if (!success) {
            return res.status(411).json({
                message: "Invaild "+ error.issues[0].path[0] + ": " + error.issues[0].message,
            })
        }

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser == null) {
            return res.status(411).json({
                message: "User does not exists"
            })
        }

        const result = await bcrypt.compare(req.body.password, existingUser.password);
        
        if (!result) {
            return res.status(401).json({
                message: "Wrong Password",
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

        return res.status(200).json({
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message: "Error while logging in"
        })
    }

})

// Filters and get all documents requested using query (filters using firstName and lastName)
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const pageSize = 10;
    const skip = (req.query.pageNum - 1) * 10;

    const count = await User.find({
        $or: [
            {"firstName": {
                "$regex": filter,
                "$options": "i"
            }}, {"lastName": {
                "$regex": filter,
                "$options": "i"
            }}
        ]
    }).countDocuments();

    const result = await User.find({
        $or: [
            {"firstName": {
                "$regex": filter,
                "$options": "i"
            }}, {"lastName": {
                "$regex": filter,
                "$options": "i"
            }}
        ]
    }, 'firstName lastName')
    .sort({ _id: 1 })
    .skip(skip)
    .limit(pageSize)
    .exec();

    return res.status(200).json({
        user: result,
        userCount: count,
    })
})

module.exports = router;