import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    imageUrl:{type:String, required:true, unique:true}
},{timestamps: true});

const Amenity = mongoose.model('Amenity', AmenitySchema);

export default Amenity;