import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/connection';

export default class UserController {
    static async getAll(_: Request, response: Response) {
        try { 
            const users = await db.select('*').table('users');
            response.status(200).json(users);
        } catch (err) {
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }

    static async get(request: Request, response: Response) {
        try {
            const id = request.param('id');

            const user = await db
                .first('*')
                .table('users')
                .where({ id });
            
            user
                ? response.status(200).json(user)
                : response.status(404).json({ error: 'User not found' });
        } catch (err) {
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }

    static async create(request: Request, response: Response) {
        try {
            const id = uuid();
            const user = {...request.body, id };
            
            await db
                .insert({ ...user })
                .table('users');
            
            response.status(201).json({ message: `User ${id} successfully added` })
        } catch (err) {
            console.log(err);
            
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }
}