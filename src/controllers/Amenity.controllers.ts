import { Request, Response } from "express";
import Amenity from "../models/Amenity";

export const createAmenity = async (req: Request, res: Response) => {
    try {
        const { name, imageUrl } = req.body;

        if (!name || !imageUrl) {
            return res
                .status(400)
                .json({ message: "Name and ImageUrl are required" });
        }


        const existingAmenity = await Amenity.findOne({ name });
        if (existingAmenity) {
            return res.status(409).json({ message: "Amenity already exists" });
        }


        const newAmenity = new Amenity({
            name,
            imageUrl,
        });

        await newAmenity.save();

        return res.status(201).json({
            message: "Amenity created successfully",
            data: newAmenity,
        });
    } catch (error) {
        console.error("Error creating amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const getAmenities = async (req: Request, res: Response) => {
    try {
        const amenities = await Amenity.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Amenities fetched successfully",
            data: amenities,
        });
    } catch (error) {
        console.error("Error fetching amenities:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const getAmenityById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const amenity = await Amenity.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: "Amenity not found" });
        }

        return res.status(200).json({
            message: "Amenity fetched successfully",
            data: amenity,
        });
    } catch (error) {
        console.error("Error fetching amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const updateAmenity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, imageUrl } = req.body;


        const amenity = await Amenity.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: "Amenity not found" });
        }


        if (name) amenity.name = name;
        if (imageUrl) amenity.imageUrl = imageUrl;

        await amenity.save();

        return res.status(200).json({
            message: "Amenity updated successfully",
            data: amenity,
        });
    } catch (error) {
        console.error("Error updating amenity:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

