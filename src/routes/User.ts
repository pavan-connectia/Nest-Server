import { Router } from "express";
import { login, updateUser } from "../controllers/User.controllers";
import { auth } from "../middleware/auth";

const router = Router();

// Admin login
router.post("/", login);

// update Admin profile
router.put("/update", auth, updateUser);





export default router;
