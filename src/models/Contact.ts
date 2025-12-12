import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    phone: string;
    message: string;
    propertyId: string;
}

const contactSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        message: { type: String, required: true },

        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);
