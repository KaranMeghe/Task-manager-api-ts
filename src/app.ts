/** @format */

import dotenv from 'dotenv';
import express from 'express';
import taskRouter from './routes/tasks';
import connectDB from './db/connect';
import errorHandler, { CustomError } from './middleware/errorHandler';
import notFound from './middleware/not-found';

dotenv.config();

const app = express();
const port = 9998;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', taskRouter);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
