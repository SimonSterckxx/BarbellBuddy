import setDb from "../domain/data-access/set.db";
import { Set } from "../domain/model/set";
import { SetInput } from "../types";

const createSet = async ({ reps, weight, exerciseId }: SetInput) => {
    const set = new Set({ reps, weight, exerciseId });
    return setDb.createSet(set);
}

const getAllSets = async ({ username, role }) => {
    if (role === 'User') {
        return setDb.getSetsForUser(username);
    }
    if (role === 'Admin') {
        return setDb.getAllSets();
    }
    throw new Error('You are not authorized to access this resource.');
}

export default {
    createSet,
    getAllSets
};