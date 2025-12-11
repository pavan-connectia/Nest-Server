import { Router } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/Property.controllers";
import { upload } from "../middleware/multer";
import { auth } from "../middleware/auth";

const router = Router();


router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]), auth,
  createProperty
);

router.get("/", getAllProperties);

router.get("/:id", getPropertyById);

router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  updateProperty
);


router.delete("/:id", auth, deleteProperty);

export default router;
