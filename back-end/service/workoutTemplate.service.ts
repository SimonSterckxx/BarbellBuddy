import { UnauthorizedError } from "express-jwt";
import userDb from "../domain/data-access/user.db";
import workoutTemplateDb from "../domain/data-access/workoutTemplate.db";
import { WorkoutTemplate } from "../domain/model/workoutTemplate";
import { WorkoutTemplateInput } from "../types";

const createWorkoutTemplate = async ({ userId, name, description, exercises }: WorkoutTemplateInput) => {
    const user = await userDb.getUserById(userId);
    const workoutTemplate = new WorkoutTemplate({ user, name, description, exercises });
    return workoutTemplateDb.createWorkoutTemplate(workoutTemplate);
};

const getAllWorkoutTemplates = async ({ username, role }) => {
    if (role === 'User') {
        const user = await userDb.getUserByUsername(username);
        return workoutTemplateDb.getWorkoutTemplatesForUser(user);
    }
    // if (role === 'Coach') {
    //     const users = userDb.getAllUsers();
    //     return exerciseDb.getAllExercises(users);
    // }
    else if (role === 'Admin')
        return workoutTemplateDb.getAllWorkoutTemplates();
    throw new UnauthorizedError('credentials_required', { message: 'You are not authorized to access this resource.' });
}

const getWorkoutTemplateById = (id: number) => {
    const workoutTemplate = workoutTemplateDb.getWorkoutTemplateById(id);
    if (!workoutTemplate) throw new Error(`Workout template with id ${id} does not exist.`)
    return workoutTemplate
}

const addExerciseToWorkoutTemplate = (workoutTemplateId: number, exerciseId: number) => {
    return workoutTemplateDb.addExerciseToWorkoutTemplate(workoutTemplateId, exerciseId);
}

const deleteExerciseFromWorkoutTemplate = (workoutTemplateId: number, exerciseId: number) => {
    return workoutTemplateDb.deleteExerciseFromWorkoutTemplate(workoutTemplateId, exerciseId);
}

// const getWorkoutTemplateById = (workoutTemplateId: number) => {
//     return workoutTemplateDb.getWorkoutTemplateById(workoutTemplateId);
// }

const deleteWorkoutTemplate = (workoutTemplateId: number) => {
    return workoutTemplateDb.deleteWorkoutTemplate(workoutTemplateId);
}

export default {
    createWorkoutTemplate,
    getAllWorkoutTemplates,
    addExerciseToWorkoutTemplate,
    deleteExerciseFromWorkoutTemplate,
    getWorkoutTemplateById,
    deleteWorkoutTemplate
}