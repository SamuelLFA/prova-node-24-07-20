import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/connection';
import Knex from 'knex';

export default class UserController {
    static async getAll(_: Request, response: Response) {
        try { 
            const users = await db.select('*').table('users');
            response.status(200).json(users);
        } catch (err) {
            console.log(err);
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
            console.log(err);
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }

    static async create(request: Request, response: Response) {
        try {
            const id = uuid();
            const user = { ...request.body, id };

            const emailInUse = await db
                .first('*')
                .table('users')
                .where({ email: user.email });

            if (emailInUse) {
                response.status(400).json(
                    {
                        message: `Email ${user.email} already used`
                    }
                );
            }

            const usernameInUse = await db
                .first('*')
                .table('users')
                .where({ username: user.username }
            );

            if (usernameInUse) {
                response.status(400).json(
                    {
                        message: `Username ${user.username} already used`
                    }
                );
            }
            
            await db
                .insert({ ...user })
                .table('users');
            
            response.status(201).json({ message: `User ${id} successfully added` });
        } catch (err) {
            console.log(err);
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }

    static async update(request: Request, response: Response) {
        try {
            const id = request.param('id');
            const {
                name,
                username,
                email
            } = request.body;

            await db
                .update({ name, username, email })
                .table('users')
                .where({ id });

            response.status(201).json({ message: `User ${id} successfully updated` });
        } catch (err) {
            console.log(err);
            response.status(500).json({
                error: 'Internal server error'
            });
        } 
    }
}