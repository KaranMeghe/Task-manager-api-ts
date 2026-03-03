/** @format */

import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must required'],
    trim: true,
    maxlength: [24, 'Tile can not be more than 20 chars'],
    minlength: [4, 'Title must have 4 chars'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model('Task', taskSchema); //Model = tool to interact with database.
export default Task;

// Schema alone cannot do database operations.Model connects schema to database.
// Schema defines the structure and model performs the operations
// What fields exist
// What type each field should be
// What validations apply
// What defaults exist
