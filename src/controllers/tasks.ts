/** @format */
import { NextFunction, Request, Response } from 'express';
import Task from '../models/task';
import mongoose from 'mongoose';
import { CustomError } from '../middleware/errorHandler';
import asyncWrapper from '../middleware/asyncWrapper';

// GET tasks
const getAllTasks = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// Get task by ID
const getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError('Invalid task ID format', 400);
  }

  const task = await Task.findById(id);
  if (!task) {
    throw new CustomError('Task not found', 404);
  }
  res.status(200).json({ task });
});

// POST task
const createNewTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// PATCH
const updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError('Invalid task ID format', 400);
  }
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  if (!task) {
    throw new CustomError('Task not found', 404);
  }

  res.status(200).json({ task });
});

// DELETE task
const deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError('Invalid task ID format', 400);
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new CustomError('Invalid task ID format', 404);
  }

  res.status(200).json({ task });
});

export { getAllTasks, getTask, createNewTask, updateTask, deleteTask };
