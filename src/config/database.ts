import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGOOSEURI = process.env.MONGOOSEURI;

export const connectToDatabase = async () => {
    try {
        if(!MONGOOSEURI){
            throw new Error("MONGOOSEURI is not defined");
        }

        await mongoose.connect(MONGOOSEURI);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.log('Error connecting to mongoDB database:', error);
        throw error;
    }
}