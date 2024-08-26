/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           username:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           age:
 *             type: number
 *             format: int32
 *           weight:
 *             type: number
 *             format: int32
 *           height:
 *             type: number
 *             format: int32
 *           createdAt:
 *             type: string
 *             format: date-time
 *       UserInput:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           age:
 *             type: number
 *             format: int32
 *           weight:
 *             type: number
 *             format: int32
 *           height:
 *             type: number
 *             format: int32
 *       AuthenticationResponse:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           password:
 *             type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import next from 'next';
import { UserInput } from '../types';
import userService from '../service/user.service';
import { stat } from 'fs';

const userRouter = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     tags: [Users]
 *     responses:
 *       '200':
 *          description: User created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationResponse'
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ status: 'success', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/getUserByUsername/{username}:
 *   get:
 *     summary: Get a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve
 *         schema:
 *           type: string
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/getUserByUsername/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const result = await userService.getUserByUsername(username);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { userRouter };