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

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    let location;
    if (body.location && typeof body.location === 'object') {
      location = {
        city: body.location.city || "",
        area: body.location.area || "",
        address: body.location.address || "",
        latitude: Number(body.location.latitude) || 0,
        longitude: Number(body.location.longitude) || 0,
      };
    } else {
      location = {
        city: body["location.city"] || body["location[city]"] || "",
        area: body["location.area"] || body["location[area]"] || "",
        address: body["location.address"] || body["location[address]"] || "",
        latitude: Number(body["location.latitude"] || body["location[latitude]"] || 0),
        longitude: Number(body["location.longitude"] || body["location[longitude]"] || 0),
      };
    }

    const roomTypes: any[] = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/roomTypes\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = Number(match[1]);
        const field = match[2];
        if (!roomTypes[index]) roomTypes[index] = {};

        if (['pricePerMonth', 'capacity', 'availableRooms'].includes(field)) {
          roomTypes[index][field] = Number(body[key]) || 0;
        } else {
          roomTypes[index][field] = body[key] || '';
        }
      }
    });

    if (roomTypes.length === 0 && Array.isArray(body.roomTypes)) {
      body.roomTypes.forEach((room: any) => {
        roomTypes.push({
          type: room.type || '',
          pricePerMonth: Number(room.pricePerMonth) || 0,
          capacity: Number(room.capacity) || 0,
          availableRooms: Number(room.availableRooms) || 0,
        });
      });
    }

    let amenities: string[] = [];
    if (body.amenities) {
      if (Array.isArray(body.amenities)) {
        amenities = body.amenities;
      } else if (typeof body.amenities === 'string') {
        amenities = body.amenities.split(',').map((id: string) => id.trim()).filter(Boolean);
      }
    }

    let services: string[] = [];
    if (body.services) {
      if (Array.isArray(body.services)) {
        services = body.services;
      } else if (typeof body.services === 'string') {
        services = body.services.split(',').map((id: string) => id.trim()).filter(Boolean);
      }
    }

    const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;

    const newImages = files?.images
      ? files.images.map((f) => `/uploads/images/${f.filename}`)
      : [];

    const newVideos = files?.videos
      ? files.videos.map((f) => `/uploads/videos/${f.filename}`)
      : [];

    const existing = await Property.findById(id);
    if (!existing)
      return res.status(404).json({ message: "Property not found" });

    const images = [...(existing.images ?? []), ...(newImages ?? [])];
    const videos = [...(existing.videos ?? []), ...(newVideos ?? [])];

    const updateData: any = {
      name: body.name || existing.name,
      description: body.description || existing.description,
      gender: body.gender || existing.gender,
      propertyType: body.propertyType || existing.propertyType,
      status: body.status || existing.status,
      location: location.city ? location : existing.location,
      roomTypes: roomTypes.length > 0 ? roomTypes : existing.roomTypes,
      amenities: amenities.length > 0 ? amenities : existing.amenities,
      services: services.length > 0 ? services : existing.services,
      images,
      videos,
    };

    const updated = await Property.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("amenities")
      .populate("services");

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updated,
    });
  } catch (err: any) {
    console.error("Update error:", err.message || err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
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



