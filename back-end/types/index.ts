import { User } from "../domain/model/user";
import { Exercise } from "../domain/model/excercise";

export type Role = 'User' | 'Coach' | 'Admin';

export type UserInput = {
    id?: number;
    username: string;
    password: string;
    role: Role;
    age: number;
    weight: number;
    height: number;
    exercises?: ExerciseInput[];
}

export type ExerciseInput = {
    id?: number;
    userId: number;
    name: string;
    muscleGroup: string;
    favorite: boolean;
}

export type SetInput = {
    id?: number;
    reps: number;
    weight: number;
    exerciseId: number;
}

export type WorkoutTemplateInput = {
    id?: number;
    userId: number;
    name: string;
    description?: string;
    exercises: Exercise[];
}

export type AuthenticationResponse = {
    token: string;
    username: string;
}