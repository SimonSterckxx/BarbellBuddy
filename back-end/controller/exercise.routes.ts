/**
 * @Swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Exercise:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           userId:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *           muscleGroup:
 *             type: string
 *           favorite:
 *             type: boolean
 *           createdAt:
 *             type: string
 *             format: date-time
 *       ExerciseInput:
 *         type: object
 *         properties:
 *           userId:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *           muscleGroup:
 *             type: string
 *           favorite:
 *             type: boolean
 */

import express, { Request, Response } from 'express';
import { ExerciseInput } from '../types';
import exerciseService from '../service/exercise.service';

const exerciseRouter = express.Router();

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExerciseInput'
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The exercise was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */

exerciseRouter.post('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        const exercise = <ExerciseInput>req.body;
        const result = await exerciseService.createExercise(exercise);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /exercises/getAllExercises:
 *   get:
 *     summary: Get all exercises
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The list of all exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */

exerciseRouter.get('/getAllExercises', async (req: Request & { auth: any }, res: Response) => {
    try {
        const { username, role } = req.auth;
        const result = await exerciseService.getAllExercises({ username, role });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /exercises/getExerciseById/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.get('/getExerciseById/:id', async (req: Request, res: Response) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const exercise = await exerciseService.getExerciseById(exerciseId);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete an exercise by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The exercise was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const exercise = await exerciseService.deleteExerciseById(exerciseId);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /exercises/addSetToExercise/{exerciseId}/{setId}:
 *   put:
 *     summary: Add a set to an exercise
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *       - in: path
 *         name: setId
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The set was successfully added to the exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.put('/addSetToExercise/:exerciseId/:setId', async (req: Request, res: Response) => {
    try {
        const exerciseId = parseInt(req.params.exerciseId);
        const setId = parseInt(req.params.setId);
        const exercise = await exerciseService.addSetToExercise(exerciseId, setId);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /exercises/deleteSetFromExercise/{exerciseId}/{setId}:
 *   put:
 *     summary: Delete a set from an exercise
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *       - in: path
 *         name: setId
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: The set was successfully deleted from the exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.put('/deleteSetFromExercise/:exerciseId/:setId', async (req: Request, res: Response) => {
    try {
        const exerciseId = parseInt(req.params.exerciseId);
        const setId = parseInt(req.params.setId);
        const exercise = await exerciseService.deleteSetFromExercise(exerciseId, setId);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});


export { exerciseRouter };