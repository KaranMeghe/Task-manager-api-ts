/** @format */

import { Request, Response, NextFunction } from 'express';

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
