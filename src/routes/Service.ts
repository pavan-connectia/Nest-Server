import { Router } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
} from "../controllers/Service.controllers";

const router = Router();

// Create Service
router.post("/", createService);

// Get All Services
router.get("/", getServices);

// Get Single Service by ID
router.get("/:id", getServiceById);

// Update Service
router.put("/:id", updateService);

export default router;
