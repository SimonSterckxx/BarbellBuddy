import { Role } from "../../types";
import { Exercise } from "./excercise";
import { WorkoutTemplate } from "./workoutTemplate";
import { Exercise as ExercisePrisma, User as UserPrisma, WorkoutTemplate as WorkoutTemplatePrisma } from '@prisma/client'

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: Role;
    readonly createdAt?: Date;
    readonly age: number;
    readonly weight: number;
    readonly height: number;

    constructor(user: { id?: number, username: string, password: string, role: Role, age: number, weight: number, height: number }) {
        this.validate(user)
        this.id = user.id
        this.username = user.username
        this.password = user.password
        this.role = user.role
        this.createdAt = new Date()
        this.age = user.age
        this.weight = user.weight
        this.height = user.height

    }
    validate(user: { id?: number; username: string; password: string; role: Role; age: number; weight: number; height: number; }) {
        if (!user.username) {
            throw new Error('Username is required')
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required')
        }
    }

    equals(other: User) {
        return (
            this.username === other.username &&
            this.password === other.password &&
            this.role === other.role
        )
    }

    static from({ id, username, password, role, age, weight, height }: UserPrisma) {
        return new User({ id, username, password, role: role as Role, age, weight, height })
    }
}
