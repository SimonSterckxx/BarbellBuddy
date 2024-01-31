import { Role } from "../../types";

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: Role

    constructor(user: { id?: number, username: string, password: string, role: Role }) {
        this.id = user.id
        this.username = user.username
        this.password = user.password
        this.role = user.role
    }

    equals(other: User) {
        return (
            this.username === other.username &&
            this.password === other.password &&
            this.role === other.role
        )
    }
}