// create user models and schemas 
import mongoose, {model, Schema} from "mongoose";


mongoose.connect("mongodb://localhost:27017/brainly")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));




const UserSchema = new Schema({
    username:{ type: String, unique: true},
    password: { type: String}
});

export const UserModel = model("Users", UserSchema);

const contentSchema = new Schema({
    title: String,
    Link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref:"tags"}],
    userId: [{ type: mongoose.Types.ObjectId, ref: "Users", required: true}],
});

export const contentModel = model("Content", contentSchema);








// import express from 'express';
// import mongoose from 'mongoose';

// const MONGO_URI = "mongodb://localhost:27017/mydatabase";
// mongoose.connect(MONGO_URI, {
//     dbName: "mydatabase",
// }).then( () => {
//     console.log("Connected To Database");
// }).catch( (err) => {
//     console.log("Database Connection Error");
// })


// const app = express();

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// })