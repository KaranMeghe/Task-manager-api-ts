/** @format */
import mongoose from 'mongoose';

const connectDB = async (connectionString: string): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Database connection failed:', error);
    // process.exit(1);
  }
};

export default connectDB;
