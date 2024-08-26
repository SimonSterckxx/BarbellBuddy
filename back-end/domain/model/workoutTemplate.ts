import { Exercise } from "./excercise";
import { User } from "./user";
import { Set as SetPrisma, Exercise as ExercisePrisma, User as UserPrisma, WorkoutTemplate as WorkoutTemplatePrisma } from '@prisma/client'

export class WorkoutTemplate {
    readonly id?: number;
    readonly user: User;
    readonly name: string;
    readonly description: string;
    readonly exercises: Exercise[];
    readonly lastUse?: Date;

    constructor(workout: { id?: number, user: User, name: string, description: string, exercises: Exercise[] }) {
        this.id = workout.id
        this.user = workout.user
        this.name = workout.name
        this.description = workout.description
        this.exercises = workout.exercises
        this.lastUse = new Date()
    }

    equals(other: WorkoutTemplate) {
        return (
            this.user === other.user &&
            this.name === other.name &&
            this.exercises === other.exercises
        )
    }

    addExerciseToWorkoutTemplate(exercise: Exercise) {
        if (this.exercises.includes(exercise)) {
            throw new Error('Exercise already exists in workout template')
        }
        this.exercises.push(exercise)
    }

    static from({ id, user, name, description, lastUse, exercises }: WorkoutTemplatePrisma & { user: UserPrisma } & { exercises: (ExercisePrisma & { user: UserPrisma } & { sets: SetPrisma[] })[] }) {
        return new WorkoutTemplate({
            id,
            user: User.from(user),
            name,
            description,
            exercises: exercises.map(exercise => Exercise.from(exercise))
        });
    }
}