"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_controllers_1 = require("../controllers/Property.controllers");
const multer_1 = require("../middleware/multer");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", multer_1.upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
]), auth_1.auth, Property_controllers_1.createProperty);
router.get("/", Property_controllers_1.getAllProperties);
router.get("/:id", Property_controllers_1.getPropertyById);
router.put("/:id", auth_1.auth, multer_1.upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
]), Property_controllers_1.updateProperty);
router.delete("/:id", auth_1.auth, Property_controllers_1.deleteProperty);
exports.default = router;
