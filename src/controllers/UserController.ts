import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/connection';

export default class UserController {
  static async getAll(_: Request, response: Response): Promise<Response> {
    try {
      const users = await db.select('*').table('users');

      return response.status(200).json(users);
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  static async get(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.param('id');

      const user = await db.first('*').table('users').where({ id });

      return user
        ? response.status(200).json(user)
        : response.status(404).json({ error: 'User not found' });
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const id = uuid();
      const user = { ...request.body, id };

      const emailInUse = await db
        .first('*')
        .table('users')
        .where({ email: user.email });

      if (emailInUse) {
        return response.status(400).json({
          error: `Email ${user.email} already used`,
        });
      }

      const usernameInUse = await db
        .first('*')
        .table('users')
        .where({ username: user.username });

      if (usernameInUse) {
        return response.status(400).json({
          error: `Username ${user.username} already used`,
        });
      }

      await db.insert({ ...user }).table('users');

      return response
        .status(201)
        .json({ message: `User ${id} successfully added` });
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  static async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.param('id');
      const { name, username, email } = request.body;

      const userFromDb = await db.first('*').table('users').where({ id });
      if (!userFromDb) {
        return response.status(404).json({ message: `User ${id} not found` });
      }

      const emailInUse = await db
        .first('*')
        .table('users')
        .where({ email })
        .andWhereNot({ id });

      if (emailInUse) {
        return response.status(400).json({
          error: `Email ${email} already used`,
        });
      }

      const usernameInUse = await db
        .first('*')
        .table('users')
        .where({ username })
        .andWhereNot({ id });

      if (usernameInUse) {
        return response.status(400).json({
          error: `Username ${username} already used`,
        });
      }

      await db.update({ name, username, email }).table('users').where({ id });

      return response
        .status(201)
        .json({ message: `User ${id} successfully updated` });
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  static async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.param('id');

      const userFromDb = await db.first('*').table('users').where({ id });
      if (!userFromDb) {
        return response.status(404).json({ message: `User ${id} not found` });
      }

      await db.delete().table('users').where({ id });

      return response
        .status(201)
        .json({ message: `User ${id} successfully deleted` });
    } catch (error) {
      console.log(`Error ->> ${error.message ?? error}`);

      return response.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}
