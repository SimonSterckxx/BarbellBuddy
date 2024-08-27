export type User = {
    id?: number;
    username: string;
    password: string;
    role: string;
    age: number;
    weight: number;
    height: number;
    createdAt: string;
}

export type UserLogin = {
    username: string;
    password: string;
}

export type Exercise = {
    id?: number;
    userId: number;
    name: string;
    muscleGroup: string;
    favorite: boolean;
    createdAt: string;
    sets: Set[];
}

export type WorkoutTemplate = {
    id?: number;
    userId: number;
    name: string;
    exercises: Exercise[];
    createdAt?: string;
}

export type Set = {
    id?: number;
    reps: number;
    weight: number;
    exerciseId: number;
    createdAt: string;
}

export type SetInput = {
    reps: number;
    weight: number;
    exerciseId: number;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
}