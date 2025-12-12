"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["boys", "girls", "unisex"],
        required: true,
    },
    propertyType: {
        type: String,
        enum: ["pg"],
        default: "pg",
    },
    location: {
        city: { type: String, required: true },
        area: { type: String, required: true },
        address: { type: String, required: true },
        latitude: Number,
        longitude: Number,
    },
    roomTypes: [
        {
            type: {
                type: String,
                required: true,
            },
            pricePerMonth: {
                type: Number,
                required: true,
            },
            capacity: {
                type: Number,
                required: true,
            },
            availableRooms: {
                type: Number,
                required: true,
            },
        },
    ],
    amenities: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Amenity",
        },
    ],
    services: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Service",
        },
    ],
    images: [
        {
            type: String,
            required: true,
        },
    ],
    videos: [
        {
            type: String,
        },
    ],
    foodMenu: [
        {
            day: { type: String, required: true },
            breakfast: { type: String, required: true },
            lunch: { type: String, required: true },
            dinner: { type: String, required: true },
        },
    ],
    status: {
        type: String,
        enum: ["available", "waiting", "closed"],
        default: "available",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Property", PropertySchema);
