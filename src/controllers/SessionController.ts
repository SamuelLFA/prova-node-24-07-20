import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/connection';
import config from '../config/settings';

export default class SessionController {
  static async login(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = request.body;
      const user = await db.first().table('users').where({ username });

      if (!user) {
        return response.status(401).json({
          error: true,
          data: {
            message: 'Not authorized',
          },
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 7200,
      });

      return response.json({
        error: false,
        data: { token: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: true,
        data: {
          message: 'Internal server error',
        },
      });
    }
  }
}
