"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGOOSEURI = process.env.MONGOOSEURI;
const connectToDatabase = async () => {
    try {
        if (!MONGOOSEURI) {
            throw new Error("MONGOOSEURI is not defined");
        }
        await mongoose_1.default.connect(MONGOOSEURI);
        console.log('Connected to MongoDB database');
    }
    catch (error) {
        console.log('Error connecting to mongoDB database:', error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
