export type User = {
    id?: number;
    username: string;
    password: string;
    role?: "Trainee" | "Coach" | "Admin";
}

export type Trainee = {
    firstName: string;
    lastName: string;
    weight: number;
}

export type Coach = {
    firstName: string;
    lastName: string;
    trainees: Trainee[];
}

