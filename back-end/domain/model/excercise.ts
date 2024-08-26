import { Set as SetPrisma, Exercise as ExercisePrisma, User as UserPrisma, WorkoutTemplate as WorkoutTemplatePrisma } from '@prisma/client'
import { User } from './user';
import { WorkoutTemplate } from './workoutTemplate';
import { Set } from './set';

export class Exercise {
    readonly id?: number;
    readonly user: User;
    readonly name: string;
    readonly muscleGroup: string;
    readonly favorite: boolean;
    readonly sets?: Set[];

    constructor({ id, user, name, muscleGroup, favorite, sets }: { id?: number; user: User; name: string; muscleGroup: string; favorite: boolean; sets: Set[] }) {
        this.id = id
        this.user = user
        this.name = name
        this.muscleGroup = muscleGroup
        this.favorite = favorite
        this.sets = sets
    }

    equals(other: Exercise) {
        return (
            this.user === other.user &&
            this.name === other.name &&
            this.muscleGroup === other.muscleGroup &&
            this.favorite === other.favorite &&
            this.sets === other.sets
        )
    }

    static from({ id, user, name, muscleGroup, favorite, sets }: ExercisePrisma
        & { user: UserPrisma } & { sets: SetPrisma[] }) {
        return new Exercise({ id, user: User.from(user), name, muscleGroup, favorite, sets: sets.map(set => Set.from(set)) });
    }
}