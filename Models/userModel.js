import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Email:{
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
        Phone: {
            type: String,
            required: true,
        },
        Role: {
            type: String,
            required: true,
        },

    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;