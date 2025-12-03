import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv'
import { connectToDatabase } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
}

startServer();