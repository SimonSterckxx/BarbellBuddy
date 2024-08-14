import { Exercise as ExercisePrisma, User as UserPrisma, WorkoutTemplate as WorkoutTemplatePrisma } from '@prisma/client'
import { User } from './user';
import { WorkoutTemplate } from './workoutTemplate';

export class Exercise {
    readonly id?: number;
    readonly user: User;
    readonly name: string;
    readonly muscleGroup: string;
    readonly favorite: boolean;

    constructor(exercise: { id?: number, user: User, name: string, muscleGroup: string, favorite: boolean }) {
        this.id = exercise.id
        this.user = exercise.user
        this.name = exercise.name
        this.muscleGroup = exercise.muscleGroup
        this.favorite = exercise.favorite
    }

    equals(other: Exercise) {
        return (
            this.user === other.user &&
            this.name === other.name &&
            this.muscleGroup === other.muscleGroup &&
            this.favorite === other.favorite
        )
    }

    static from({ id, user, name, muscleGroup, favorite }: ExercisePrisma
        & { user: UserPrisma }) {
        return new Exercise({ id, user: User.from(user), name, muscleGroup, favorite })
    }
}