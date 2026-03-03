/** @format */

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('ERROR HANDLER HIT:', err);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: Object.values(err.errors)
        .map((val) => val.message)
        .join(', '),
    });
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
    return;
  }
};

export default errorHandler;
