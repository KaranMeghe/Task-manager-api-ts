/** @format */
import { Response, Request } from 'express';

const notFound = (req: Request, res: Response) => {
  return res.status(404).send('Route not found');
};

export default notFound;
