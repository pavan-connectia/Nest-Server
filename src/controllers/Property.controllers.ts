import { Request, Response } from "express";
import Property from "../models/Property";

// CREATE PROPERTY
export const createProperty = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      gender,
      location,
      roomTypes,
      amenities,
      services,
      images,
      videos,
      status,
    } = req.body;

    const imageFiles = req.files && (req.files as any).images;
    const videoFiles = req.files && (req.files as any).videos;

    const imageUrls = imageFiles
      ? imageFiles.map((file: any) => `/uploads/images/${file.filename}`)
      : [];

    const videoUrls = videoFiles
      ? videoFiles.map((file: any) => `/uploads/videos/${file.filename}`)
      : [];

    if (!name || !gender || !location || !roomTypes || roomTypes.length === 0 || !amenities || !services || !imageFiles) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newProperty = new Property({
      name,
      description,
      gender,
      location,
      roomTypes,
      amenities,
      services,
      images: imageUrls,
      videos: videoUrls,
      status,
    });

    await newProperty.save();

    return res.status(201).json({
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ALL PROPERTIES
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const {
      name,
      city,
      area,
      gender,
      status,
      sharing,
      minPrice,
      maxPrice,
    } = req.query;

    let filter: any = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (area) filter["location.area"] = { $regex: area, $options: "i" };
    if (gender) filter.gender = gender;
    if (status) filter.status = status;

    if (minPrice || maxPrice) {
      filter["roomTypes.pricePerMonth"] = {};
      if (minPrice) filter["roomTypes.pricePerMonth"]["$gte"] = Number(minPrice);
      if (maxPrice) filter["roomTypes.pricePerMonth"]["$lte"] = Number(maxPrice);
    }

    if (sharing) {
      filter["roomTypes.type"] = { $regex: sharing, $options: "i" };
    }

    const properties = await Property.find(filter)
      .populate("amenities")
      .populate("services")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Properties fetched successfully",
      results: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


// GET PROPERTY BY ID
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id)
      .populate("amenities")
      .populate("services");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("amenities")
      .populate("services");

    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};



