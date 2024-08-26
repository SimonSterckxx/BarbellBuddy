/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       WorkoutTemplate:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           userId:
 *             type: number
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           exercises:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Exercise'
 *           lastUse:
 *             type: string
 *             format: date-time
 *       WorkoutTemplateInput:
 *         type: object
 *         properties:
 *           userId:
 *             type: number
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           exercises:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ExerciseInput'
 */
import express, { NextFunction, Request, Response } from 'express';
import { WorkoutTemplate } from '../domain/model/workoutTemplate';
import workoutTemplateService from '../service/workoutTemplate.service';
import { WorkoutTemplateInput } from '../types';

const workoutTemplateRouter = express.Router();

/**
 * @swagger
 * /workouttemplates:
 *   post:
 *     summary: Create a new workout template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutTemplate'
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The workout template was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 */
workoutTemplateRouter.post('/', async (req: Request, res: Response) => {
    try {
        const workoutTemplate = <WorkoutTemplateInput>req.body;
        console.log("workoutTemplate", workoutTemplate);
        const result = await workoutTemplateService.createWorkoutTemplate(workoutTemplate);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /workouttemplates/getAllWorkoutTemplates:
 *   get:
 *     summary: Get all workout templates
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The list of workout templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutTemplate'
 */
workoutTemplateRouter.get('/getAllWorkoutTemplates', async (req: Request & { auth: any }, res: Response) => {
    try {
        const { username, role } = req.auth;
        const result = await workoutTemplateService.getAllWorkoutTemplates({ username, role });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /workoutTemplates/{id}:
 *   get:
 *     summary: Get a workout template by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           description: The ID of the workout template
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The workout template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       404:
 *         description: The workout template was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
workoutTemplateRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await workoutTemplateService.getWorkoutTemplateById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /workoutTemplates/{id}:
 *   delete:
 *     summary: Delete a workout template
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           description: The ID of the workout template
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The workout template was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       404:
 *         description: The workout template was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
workoutTemplateRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await workoutTemplateService.deleteWorkoutTemplate(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /workoutTemplates/{id}/addExerciseToWorkoutTemplate:
 *   put:
 *     summary: Add an exercise to a workout template
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           description: The ID of the workout template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseId:
 *                 type: integer
 *                 format: int64
 *                 description: The ID of the exercise to be added
 *             required:
 *               - exerciseId
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The exercise was successfully added to the workout template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       400:
 *         description: The exercise could not be added to the workout template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: The workout template was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
workoutTemplateRouter.put('/:id/addExerciseToWorkoutTemplate', async (req: Request, res: Response, next: NextFunction) => {
    const workoutTemplateId = parseInt(req.params.id, 10);
    const { exerciseId } = req.body;

    try {
        const updatedWorkoutTemplate = await workoutTemplateService.addExerciseToWorkoutTemplate(workoutTemplateId, parseInt(exerciseId));
        res.status(200).json(updatedWorkoutTemplate);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /workoutTemplates/{id}/deleteExerciseFromWorkoutTemplate:
 *   put:
 *     summary: Delete an exercise from a workout template
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           description: The ID of the workout template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseId:
 *                 type: integer
 *                 format: int64
 *                 description: The ID of the exercise to be deleted
 *             required:
 *               - exerciseId
 *     security:
 *       - bearerAuth: []
 *     tags: [Workout Templates]
 *     responses:
 *       200:
 *         description: The exercise was successfully deleted from the workout template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       400:
 *         description: The exercise could not be deleted from the workout template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: The workout template was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
workoutTemplateRouter.put('/:id/deleteExerciseFromWorkoutTemplate', async (req: Request, res: Response, next: NextFunction) => {
    const workoutTemplateId = parseInt(req.params.id, 10);
    const { exerciseId } = req.body;

    try {
        const updatedWorkoutTemplate = await workoutTemplateService.deleteExerciseFromWorkoutTemplate(workoutTemplateId, parseInt(exerciseId));
        res.status(200).json(updatedWorkoutTemplate);
    } catch (error) {
        next(error);
    }
});


export { workoutTemplateRouter };