import { Request, Response, NextFunction } from 'express';
import LoginSchema from '../schemas/LoginSchema';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const validBody = LoginSchema.validate(request.body);

  return validBody.error
    ? response.status(400).json({ error: validBody.error?.message })
    : next();
};
