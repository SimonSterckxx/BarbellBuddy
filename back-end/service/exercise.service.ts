import { UnauthorizedError } from "express-jwt";
import exerciseDb from "../domain/data-access/exercise.db";
import userDb from "../domain/data-access/user.db";
import { Exercise } from "../domain/model/excercise";
import { ExerciseInput } from "../types";
import { Set } from "../domain/model/set";

const createExercise = async ({ userId, name, muscleGroup, favorite }: ExerciseInput) => {
    const user = await userDb.getUserById(userId);
    const exercise = new Exercise({ user, name, muscleGroup, favorite, sets: [] });
    return exerciseDb.createExercise(exercise);
}

const getAllExercises = async ({ username, role }) => {
    if (role === 'User') {
        const user = await userDb.getUserByUsername(username);
        return exerciseDb.getExercisesForUser(user);
    }
    // if (role === 'Coach') {
    //     const users = userDb.getAllUsers();
    //     return exerciseDb.getAllExercises(users);
    // }
    else if (role === 'Admin')
        return exerciseDb.getAllExercises();
    throw new UnauthorizedError('credentials_required', { message: 'You are not authorized to access this resource.' });
}

const getExerciseById = (id: number): Promise<Exercise> => {
    const exercise = exerciseDb.getExerciseById(id);
    if (!exercise) throw new Error(`Exercise with id ${id} does not exist.`)
    return exercise
}

const deleteExerciseById = (id: number) => {
    const exercise = exerciseDb.getExerciseById(id);
    if (!exercise) throw new Error(`Exercise with id ${id} does not exist.`)
    exerciseDb.deleteExerciseById(id);
}


export default {
    createExercise,
    getAllExercises,
    getExerciseById,
    deleteExerciseById
};