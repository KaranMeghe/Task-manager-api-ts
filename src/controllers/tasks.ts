/** @format */
import { NextFunction, Request, Response } from 'express';
import Task from '../models/task';
import mongoose from 'mongoose';
import { CustomError } from '../middleware/errorHandler';

// GET tasks
const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.find({});
    res.status(200).json({ task });
    return;
  } catch (err) {
    return next(err);
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid task ID format', 400);
    }

    const task = await Task.findById(id);
    if (!task) {
      throw new CustomError('Task not found', 404);
    }
    res.status(200).json({ task });
    return;
  } catch (err) {
    return next(err);
  }
};

// POST task
const createNewTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      task,
    });
    return;
  } catch (err) {
    return next(err);
  }
};

// PATCH
const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid task ID format', 400);
    }
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!task) {
      throw new CustomError('Task not found', 404);
    }

    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

// DELETE task
const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid task ID format', 400);
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      throw new CustomError('Invalid task ID format', 404);
    }

    res.status(200).json({ task });
  } catch (err) {
    return next(err); // explicitly forward to errorHandler
  }
};

export { getAllTasks, getTask, createNewTask, updateTask, deleteTask };
