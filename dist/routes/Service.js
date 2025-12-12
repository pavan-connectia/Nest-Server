"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Service_controllers_1 = require("../controllers/Service.controllers");
const router = (0, express_1.Router)();
// Create Service
router.post("/", Service_controllers_1.createService);
// Get All Services
router.get("/", Service_controllers_1.getServices);
// Get Single Service by ID
router.get("/:id", Service_controllers_1.getServiceById);
// Update Service
router.put("/:id", Service_controllers_1.updateService);
exports.default = router;
