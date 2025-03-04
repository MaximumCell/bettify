import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true })


export const User = mongoose.model("User", userSchema);