"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controllers_1 = require("../controllers/User.controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Admin login
router.post("/", User_controllers_1.login);
// update Admin profile
router.put("/update", auth_1.auth, User_controllers_1.updateUser);
exports.default = router;
