const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    trim: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address"
    ]
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;