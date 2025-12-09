import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    imageUrl:{type:String, required:true, unique:true}
},{timestamps: true});

const Service = mongoose.model('Service', ServiceSchema);

export default Service;