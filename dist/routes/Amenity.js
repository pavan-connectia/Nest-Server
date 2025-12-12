"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Amenity_controllers_1 = require("../controllers/Amenity.controllers");
const router = (0, express_1.Router)();
// Create
router.post("/", Amenity_controllers_1.createAmenity);
// Get All
router.get("/", Amenity_controllers_1.getAmenities);
// Get Single by ID
router.get("/:id", Amenity_controllers_1.getAmenityById);
// Update
router.put("/:id", Amenity_controllers_1.updateAmenity);
exports.default = router;
