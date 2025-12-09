import { Request, Response } from "express";
import Service from "../models/Services";

// CREATE
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({
        message: "Name and ImageUrl are required",
      });
    }

    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(409).json({ message: "Service already exists" });
    }

    const newService = new Service({
      name,
      imageUrl,
    });

    await newService.save();

    return res.status(201).json({
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Error creating Service:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

// GET ALL
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

// GET SINGLE BY ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

// UPDATE
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (name) service.name = name;
    if (imageUrl) service.imageUrl = imageUrl;

    await service.save();

    return res.status(200).json({
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error updating Service:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
