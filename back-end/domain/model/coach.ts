import { Role } from "../../types";
import { Trainee } from "./trainee";
import { User } from "./user";

export class Coach extends User {
    readonly firstName: string
    readonly lastName: string
    readonly trainees?: Trainee[]

    constructor(user: User, coach: { firstName: string, lastName: string, trainees: Trainee[] }) {
        super(user)
        this.firstName = coach.firstName
        this.lastName = coach.lastName
        this.trainees = coach.trainees
    }

    equals(other: Coach) {
        return (
            super.equals(other) &&
            this.firstName === other.firstName &&
            this.lastName === other.lastName &&
            this.trainees === other.trainees
        )
    }
}