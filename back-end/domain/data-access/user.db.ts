import { User } from "../model/user";
import database from "../../util/database";
import { th } from "date-fns/locale";

const createUser = async ({ username, password, role, age, weight, height }: User): Promise<User> => {
    console.log('Creating user...');
    try {
        const userPrisma = await database.user.create({
            data: {
                username,
                password,
                role,
                age,
                weight,
                height
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Could not create user');
    }
}

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                exercises: true,
                workoutTemplates: true
            }
        });
        return usersPrisma.map(userPrisma => User.from(userPrisma));
    } catch (error) {
        console.error(error);
    }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                username
            }
        });
        if (!userPrisma) {
            return null;
        }
        console.log('User found:', userPrisma);
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
    }
}

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id
            }
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
    }
};

// const addExercise = (userId, exercise) => {
//     const user = users.find(user => user.id === userId);
//     user.exercises.push(exercise);
// };

// const addWorkoutTemplate = (userId, workoutTemplate) => {
//     const user = users.find(user => user.id === userId);
//     user.workoutTemplates.push(workoutTemplate);
// }

export default {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    // addExercise,
    // addWorkoutTemplate
};