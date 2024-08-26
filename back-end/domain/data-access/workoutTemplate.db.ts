import database from "../../util/database";
import { WorkoutTemplate } from "../model/workoutTemplate";

const createWorkoutTemplate = async ({ user, name, description, exercises }) => {
    try {
        const workoutTemplatePrisma = await database.workoutTemplate.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                name,
                description,
                exercises: {
                    connect: exercises.map(exercise => ({ id: exercise.id }))
                },
            },
            include: {
                exercises: {
                    include: {
                        user: true,
                        sets: true
                    }
                },
                user: true
            },
        });
        return WorkoutTemplate.from(workoutTemplatePrisma);
    } catch (error) {
        console.error(error);
    }
}

const getAllWorkoutTemplates = async (): Promise<WorkoutTemplate[]> => {
    try {
        const workoutTemplatesPrisma = await database.workoutTemplate.findMany({
            include: {
                user: true, exercises: {
                    include: {
                        user: true,
                        sets: true
                    }
                }
            }
        });
        return workoutTemplatesPrisma.map(workoutTemplatePrisma => WorkoutTemplate.from(workoutTemplatePrisma));
    }
    catch (error) {
        console.error(error);
    }
};

const getWorkoutTemplatesForUser = async (user): Promise<WorkoutTemplate[]> => {
    try {
        const workoutTemplatesPrisma = await database.workoutTemplate.findMany({
            where: {
                userId: user.id
            },
            include: {
                user: true,
                exercises: {
                    include: {
                        user: true,
                        sets: true
                    }
                }
            }
        });
        return workoutTemplatesPrisma.map(workoutTemplatePrisma => WorkoutTemplate.from(workoutTemplatePrisma));
    } catch (error) {
        console.error(error);
    }
};

const getWorkoutTemplateById = async (id: number): Promise<WorkoutTemplate | null> => {
    try {
        const workoutTemplatePrisma = await database.workoutTemplate.findUnique({
            where: { id },
            include: {
                user: true,
                exercises: {
                    include: {
                        user: true,
                        sets: true
                    }
                }
            }
        });
        return workoutTemplatePrisma ? WorkoutTemplate.from(workoutTemplatePrisma) : null;
    } catch (error) {
        console.error(error);
    }
}


// const getWorkoutTemplateById = (workoutTemplateId: number): WorkoutTemplate => workoutTemplates.find(workoutTemplate => workoutTemplate.id === workoutTemplateId);

const addExerciseToWorkoutTemplate = async (workoutTemplateId: number, exerciseId: number) => {
    try {
        const updatedWorkoutTemplate = await database.workoutTemplate.update({
            where: { id: workoutTemplateId },
            data: {
                exercises: {
                    connect: { id: exerciseId }
                }
            },
            include: {
                user: true,
                exercises: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return updatedWorkoutTemplate;
    } catch (error) {
        console.error('Error adding exercise to workout template:', error);
        throw error;
    }
};

const deleteExerciseFromWorkoutTemplate = async (workoutTemplateId: number, exerciseId: number) => {
    try {
        const updatedWorkoutTemplate = await database.workoutTemplate.update({
            where: { id: workoutTemplateId },
            data: {
                exercises: {
                    disconnect: { id: exerciseId }
                }
            },
            include: {
                user: true,
                exercises: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return updatedWorkoutTemplate;
    } catch (error) {
        console.error('Error deleting exercise from workout template:', error);
        throw error;
    }
}

const deleteWorkoutTemplate = async (workoutTemplateId: number) => {
    try {
        await database.workoutTemplate.delete({
            where: { id: workoutTemplateId }
        });
    } catch (error) {
        console.error('Error deleting workout template:', error);
        throw error;
    }
}

export default {
    createWorkoutTemplate,
    getAllWorkoutTemplates,
    getWorkoutTemplatesForUser,
    getWorkoutTemplateById,
    addExerciseToWorkoutTemplate,
    deleteExerciseFromWorkoutTemplate,
    deleteWorkoutTemplate
}