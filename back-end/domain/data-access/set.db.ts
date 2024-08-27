import database from "../../util/database";
import { Set } from "../model/set";

const createSet = async ({ reps, weight, exerciseId }: Set): Promise<Set> => {
    try {
        const setPrisma = await database.set.create({
            data: {
                reps: reps,
                weight: weight,
                exerciseId: exerciseId
            },
        });
        return Set.from(setPrisma);
    } catch (error) {
        console.error(error);
    }
};

const getAllSets = async (): Promise<Set[]> => {
    try {
        const setsPrisma = await database.set.findMany();
        return setsPrisma.map((set) => Set.from(set));
    } catch (error) {
        console.error(error);
    }
}

const getSetsForUser = async (username: string): Promise<Set[]> => {
    try {
        const setsPrisma = await database.set.findMany({
            where: {
                exercise: {
                    user: {
                        username: username
                    }
                }
            }
        });
        return setsPrisma.map((set) => Set.from(set));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {
    createSet,
    getAllSets,
    getSetsForUser
};