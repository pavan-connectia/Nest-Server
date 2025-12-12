"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = exports.getServiceById = exports.getServices = exports.createService = void 0;
const Services_1 = __importDefault(require("../models/Services"));
// CREATE
const createService = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({
                message: "Name and ImageUrl are required",
            });
        }
        const existingService = await Services_1.default.findOne({ name });
        if (existingService) {
            return res.status(409).json({ message: "Service already exists" });
        }
        const newService = new Services_1.default({
            name,
            imageUrl,
        });
        await newService.save();
        return res.status(201).json({
            message: "Service created successfully",
            data: newService,
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
exports.createService = createService;
// GET ALL
const getServices = async (req, res) => {
    try {
        const services = await Services_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Services fetched successfully",
            data: services,
        });
    }
    catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.getServices = getServices;
// GET SINGLE BY ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services_1.default.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({
            message: "Service fetched successfully",
            data: service,
        });
    }
    catch (error) {
        console.error("Error fetching service:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.getServiceById = getServiceById;
// UPDATE
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imageUrl } = req.body;
        const service = await Services_1.default.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        if (name)
            service.name = name;
        if (imageUrl)
            service.imageUrl = imageUrl;
        await service.save();
        return res.status(200).json({
            message: "Service updated successfully",
            data: service,
        });
    }
    catch (error) {
        console.error("Error updating Service:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
exports.updateService = updateService;
