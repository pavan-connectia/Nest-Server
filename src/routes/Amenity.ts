import { Router } from "express";
import {
  createAmenity,
  getAmenities,
  getAmenityById,
  updateAmenity,
} from "../controllers/Amenity.controllers";

const router = Router();

// Create
router.post("/", createAmenity);

// Get All
router.get("/", getAmenities);

// Get Single by ID
router.get("/:id", getAmenityById);

// Update
router.put("/:id", updateAmenity);

export default router;
