import { Exercise } from "./excercise";
import { Set as SetPrisma, Exercise as ExercisePrisma, User as UserPrisma } from '@prisma/client'

export class Set {
    readonly id?: number;
    readonly reps: number;
    readonly weight: number;
    readonly exerciseId: number;
    readonly createdAt?: Date;

    constructor({ id, reps, weight, exerciseId, createdAt }: { id?: number; reps: number; weight: number; exerciseId: number; createdAt?: Date }) {
        // this.validate({ id, reps, weight })
        this.id = id
        this.reps = reps
        this.weight = weight
        this.exerciseId = exerciseId
        this.createdAt = createdAt
    }

    // validate(set: { id?: number; reps: number; weight: number; }) {
    //     if (!set.reps) {
    //         throw new Error('Reps is required')
    //     }
    //     if (!set.weight) {
    //         throw new Error('Weight is required')
    //     }
    // }

    // equals(other: Set) {
    //     return (
    //         this.reps === other.reps &&
    //         this.weight === other.weight
    //     )
    // }

    static from({ id, reps, weight, exerciseId, createdAt }: SetPrisma) {
        return new Set({ id, reps, weight, exerciseId, createdAt });
    }
}