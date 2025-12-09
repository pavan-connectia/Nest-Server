import { Router } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/Property.controllers";

const router = Router();

// Create property
router.post("/", createProperty);

// Get all properties
router.get("/", getAllProperties);

// Get single property by ID
router.get("/:id", getPropertyById);

// Update property
router.put("/:id", updateProperty);

// Delete property
router.delete("/:id", deleteProperty);

export default router;
