const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
       const user = new User({
    name: req.body.name,
    email: req.body.email,
    owner: req.user.id
});
        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                err => err.message
            );

            return res.status(400).json({
                message: messages.join(", ")
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await User.find({
        owner: req.user.id
});
        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get users"
        });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({
    _id: req.params.id,
    owner: req.user.id
});

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(400).json({
            message: "Invalid user ID"
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
    {
        _id: req.params.id,
        owner: req.user.id
    },
            {
                name: req.body.name,
                email: req.body.email
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(400).json({
            message: "Invalid user ID or data"
        });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id
});

       router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found or access denied"
            });
        }

        res.json({
            message: "User deleted successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid user ID"
        });
    }
});

        res.json({
            message: "User deleted successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid user ID"
        });
    }
});

module.exports = router;