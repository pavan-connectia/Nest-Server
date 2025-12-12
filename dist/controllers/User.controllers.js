"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            });
        }
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }
        ;
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }
        const isProduction = process.env.NODE_ENV === "production";
        const age = 7 * 24 * 60 * 60;
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: age,
        });
        user.token = token;
        res.status(200)
            .json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
                error: false,
                success: true
            },
        });
    }
    catch (error) {
        console.error("Error creating Service:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.login = login;
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false,
            });
        }
        const user = await user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }
        if (email && email !== user.email) {
            const existingEmail = await user_1.default.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({
                    message: "Email already in use",
                    error: true,
                    success: false,
                });
            }
            user.email = email;
        }
        if (name)
            user.name = name;
        if (password) {
            const hashed = await bcryptjs_1.default.hash(password, 10);
            user.password = hashed;
        }
        await user.save();
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.token,
            },
            error: false,
            success: true,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
            success: false
        });
    }
};
exports.updateUser = updateUser;
