import setDb from "../domain/data-access/set.db";
import { Set } from "../domain/model/set";
import { SetInput } from "../types";

const createSet = async ({ reps, weight, exerciseId }: SetInput) => {
    const set = new Set({ reps, weight, exerciseId });
    return setDb.createSet(set);
}

export default {
    createSet
};