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

export default {
    createSet
};