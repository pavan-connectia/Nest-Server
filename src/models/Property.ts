import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  name: string;
  description?: string;
  gender: "boys" | "girls" | "unisex";
  propertyType: "pg" | "hostel" | "apartment" | "studio";

  location: {
    city: string;
    area: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };

  roomTypes: Array<{
    type: string;
    pricePerMonth: number;
    capacity: number;
    availableRooms: number;
  }>;

  amenities: mongoose.Types.ObjectId[];
  services: mongoose.Types.ObjectId[];

  images: string[];
  videos?: string[];

  foodMenu?: Array<{
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
  }>;

  status: "available" | "waiting" | "closed";
}

const PropertySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["boys", "girls", "unisex"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["pg"],
      default: "pg",
    },

    location: {
      city: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, required: true },
      latitude: Number,
      longitude: Number,
    },

    roomTypes: [
      {
        type: {
          type: String,
          required: true,
        },
        pricePerMonth: {
          type: Number,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        availableRooms: {
          type: Number,
          required: true,
        },
      },
    ],

    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],

    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    images: [
      {
        type: String,
        required: true,
      },
    ],

    videos: [
      {
        type: String,
      },
    ],

        foodMenu: [
      {
        day: { type: String, required: true },
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true },
        dinner: { type: String, required: true },
      },
    ],

    status: {
      type: String,
      enum: ["available", "waiting", "closed"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProperty>("Property", PropertySchema);