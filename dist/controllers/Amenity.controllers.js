"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAmenity = exports.getAmenityById = exports.getAmenities = exports.createAmenity = void 0;
const Amenity_1 = __importDefault(require("../models/Amenity"));
const createAmenity = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res
                .status(400)
                .json({ message: "Name and ImageUrl are required" });
        }
        const existingAmenity = await Amenity_1.default.findOne({ name });
        if (existingAmenity) {
            return res.status(409).json({ message: "Amenity already exists" });
        }
        const newAmenity = new Amenity_1.default({
            name,
            imageUrl,
        });
        await newAmenity.save();
        return res.status(201).json({
            message: "Amenity created successfully",
            data: newAmenity,
        });
    }
    catch (error) {
        console.error("Error creating amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.createAmenity = createAmenity;
const getAmenities = async (req, res) => {
    try {
        const amenities = await Amenity_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Amenities fetched successfully",
            data: amenities,
        });
    }
    catch (error) {
        console.error("Error fetching amenities:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.getAmenities = getAmenities;
const getAmenityById = async (req, res) => {
    try {
        const { id } = req.params;
        const amenity = await Amenity_1.default.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: "Amenity not found" });
        }
        return res.status(200).json({
            message: "Amenity fetched successfully",
            data: amenity,
        });
    }
    catch (error) {
        console.error("Error fetching amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.getAmenityById = getAmenityById;
const updateAmenity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imageUrl } = req.body;
        const amenity = await Amenity_1.default.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: "Amenity not found" });
        }
        if (name)
            amenity.name = name;
        if (imageUrl)
            amenity.imageUrl = imageUrl;
        await amenity.save();
        return res.status(200).json({
            message: "Amenity updated successfully",
            data: amenity,
        });
    }
    catch (error) {
        console.error("Error updating amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.updateAmenity = updateAmenity;
