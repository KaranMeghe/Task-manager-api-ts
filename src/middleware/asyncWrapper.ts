/** @format */

import { Request, Response, NextFunction, RequestHandler } from 'express';

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const asyncWrapper = (controller: AsyncFunction): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncWrapper;
