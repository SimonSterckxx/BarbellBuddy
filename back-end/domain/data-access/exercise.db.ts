import { Exercise } from "../model/excercise";
import database from "../../util/database";

const createExercise = async ({ user, name, muscleGroup, favorite }) => {
    try {
        const exercisePrisma = await database.exercise.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    },
                },
                name,
                muscleGroup,
                favorite,
            },
            include: {
                user: true,
                sets: true
            }
        });
        return Exercise.from(exercisePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Could not create exercise');
    }
}

const getAllExercises = async (): Promise<Exercise[]> => {
    try {
        const exercisesPrisma = await database.exercise.findMany({ include: { user: true, sets: true } });
        return exercisesPrisma.map(exercisePrisma => Exercise.from(exercisePrisma));
    } catch (error) {
        console.error(error);
    }
};

const getExerciseById = async (id: number): Promise<Exercise | null> => {
    try {
        const exercisePrisma = await database.exercise.findUnique({
            where: { id },
            include: { user: true, sets: true }
        });
        const exercise = exercisePrisma ? Exercise.from(exercisePrisma) : null
        return exercise
    } catch (error) {
        console.error(error);
    }
}

const getExercisesForUser = async (user) => {
    try {
        const exercisesPrisma = await database.exercise.findMany({
            where: {
                userId: user.id
            },
            include: {
                user: true,
                sets: true
            }
        });
        const exercises = exercisesPrisma.map(exercisePrisma => Exercise.from(exercisePrisma));
        return exercises;
    }
    catch (error) {
        console.error(error);
    }
}

// const getAllExercisesByUserId = (userId: number): Exercise[] => exercises.filter(exercise => exercise.userId === userId);

const deleteExerciseById = async (id: number) => {
    try {
        await database.exercise.delete({
            where: { id }
        });
    } catch (error) {
        console.error(error);
    }
}

export default {
    createExercise,
    getAllExercises,
    getExerciseById,
    getExercisesForUser,
    // getAllExercisesByUserId,
    deleteExerciseById,
};