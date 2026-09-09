const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be at least 2 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        }
    },
    {
        timestamps: true
    }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;