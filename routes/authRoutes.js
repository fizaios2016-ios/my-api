const express = require("express");
const bcrypt = require("bcryptjs");
const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const RefreshToken = require("../models/RefreshToken");
const { body, validationResult } = require("express-validator");

const router = express.Router();
console.log("AUTH ROUTES FILE LOADED");

// REGISTER
router.post(
    "/register",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email address")
            .normalizeEmail(),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array()[0].msg
                });
            }

            const { name, email, password } = req.body;

            const existingUser = await Auth.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new Auth({
                name,
                email,
                password: hashedPassword
            });

            await user.save();

            res.status(201).json({
                message: "User registered successfully"
            });

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            res.status(500).json({
                message: "Server error"
            });
        }
    }
);
// LOGIN
router.post(
    "/login",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email address")
            .normalizeEmail(),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array()[0].msg
                });
            }

            const { email, password } = req.body;

            const user = await Auth.findOne({ email });

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            await RefreshToken.deleteMany({
                user: user._id
            });

            await RefreshToken.create({
                token: refreshToken,
                user: user._id,
                expiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                )
            });

            res.json({
                message: "Login successful",
                token,
                refreshToken
            });

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            res.status(500).json({
                message: "Server error"
            });
        }
    }
);
// LOGOUT
router.post("/logout", async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is required"
            });
        }

        await RefreshToken.deleteOne({
            token: refreshToken
        });

        res.json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// GET CURRENT USER
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await Auth.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/test", (req, res) => {
    res.json({
        message: "Auth route is working"
    });
});
module.exports = router;

