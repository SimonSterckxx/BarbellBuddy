/**
 * @Swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Set:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           reps:
 *             type: number
 *           weight:
 *             type: number
 *           exercise:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 *               name:
 *                 type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *                   age:
 *                     type: number
 *                     format: int32
 *       SetInput:
 *         type: object
 *         properties:
 *           reps:
 *             type: number
 *           weight:
 *             type: number
 *           exerciseId:
 *             type: number
 *             format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import next from 'next';
import { SetInput } from '../types';
import setService from '../service/set.service';

const setRouter = express.Router();

/**
 * @swagger
 * /sets:
 *   post:
 *     summary: Create a new set
 *     security:
 *       - bearerAuth: []
 *     tags: [Sets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetInput'
 *     responses:
 *       200:
 *         description: The set was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Set'
 *       400:
 *         description: The set was not created
 */

setRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reps, weight, exerciseId } = req.body as SetInput;
        const set = await setService.createSet({ reps, weight, exerciseId });
        res.status(200).json(set);
    } catch (error) {
        next(error)
    }
});

setRouter.get('/getAllSets', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { username, role } = req.auth;
        const set = await setService.getAllSets({ username, role });
        res.status(200).json(set)
    } catch (error) {
        next(error)
    }

})

export { setRouter };