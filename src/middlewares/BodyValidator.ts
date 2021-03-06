import { Request, Response, NextFunction } from 'express';
import UserValidator from '../schemas/UserSchema';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const validBody = UserValidator.validate(request.body);

  return validBody.error
    ? response.status(400).json({ error: validBody.error?.message })
    : next();
};
