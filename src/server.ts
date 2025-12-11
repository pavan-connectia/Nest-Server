import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import amenityRoutes from './routes/Amenity';
import serviceRoutes from './routes/Service';
import propertyRoutes from './routes/Property'
import userRoutes from './routes/User'
import cors from 'cors';
import path from "path";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://nest-admin-dashboard.vercel.app"
  ]
}));


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use('/api/amenities', amenityRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users',userRoutes)

app.use((req,res)=>{
    return res.status(200).json({
    success: true,
    message: "Api is running",
  });
})

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
};

startServer();
