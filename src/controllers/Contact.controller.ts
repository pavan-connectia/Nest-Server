import { Request, Response } from "express";
import Contact from "../models/Contact"; // No .js extension in TS

export const createContact = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, phone, message, propertyId } = req.body;

        if (!name || !phone || !message || !propertyId) {
            return res.status(400).json({
                success: false,
                message: "All fields including propertyId are required",
            });
        }

        const newMessage = await Contact.create({
            name,
            phone,
            message,
            propertyId,
        });

        return res.status(201).json({
            success: true,
            message: "Message received successfully",
            data: newMessage,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


export const getAllContacts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const deleteContact = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact message deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};