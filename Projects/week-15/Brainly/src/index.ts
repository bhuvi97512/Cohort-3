import express from "express"; 
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";


const app = express();
app.use(express.json());

// Route 1 : User signup
app.post("/api/v1/signup",  async (req, res) => {
    // zod validation, hashing

    const username = req.body.username;
    const password = req.body.password;

    try {

        await UserModel.create({
            username,
            password
    });
    res.json({
        message: "User Signed Up Successfully"
    }) 
    
    } catch(err) {
        res.status(411).json({
            message: "User already exists"
        })
    }
    
    
    
});

// Route 2 : user Signin
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    });
    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }

});

// Route 3 : Add content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { Link , type, title } = req.body; 
    await contentModel.create({
        
        Link,
        //@ts-ignore
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });

    res.json({
        message: "Content added Successfully"
    });

});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })

});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted Successfully"
    })
});

app.post("/api/v1/brain/share",  (req, res) => {

});

app.get("/api/v1/brain/:shareLink",  (req, res) => {

});

app.listen(3000);