import { Role } from "../../types";
import { User } from "./user";

export class Trainee extends User {
    readonly firstName: string
    readonly lastName: string
    readonly weight: number

    constructor(user: User, trainee: { firstName: string, lastName: string, weight: number }) {
        super(user)
        this.firstName = trainee.firstName
        this.lastName = trainee.lastName
        this.weight = trainee.weight
    }
}