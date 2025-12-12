import { Router } from "express";
import {
    createContact,
    deleteContact,
    getAllContacts,
} from "../controllers/Contact.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", createContact);
router.get("/",auth, getAllContacts);
router.delete("/:id",auth, deleteContact);


export default router;
