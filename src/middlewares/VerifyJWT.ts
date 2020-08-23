import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import { verify } from 'jsonwebtoken';
import settings from '../config/settings';

const verifyPromise = promisify(verify);

export default async function verifyJWT(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({
      error: true,
      data: {
        message: 'Not Authorized',
      },
    });
  }
  try {
    const tokenArray = token.split('Bearer ');
    const jwt = tokenArray[tokenArray.length - 1];
    const decode = await verifyPromise(jwt, settings.secret);
    response.locals = {
      id: decode,
    };
    return next();
  } catch (error) {
    return response.status(401).json({
      error: true,
      data: {
        message: 'Invalid token',
      },
    });
  }
}
