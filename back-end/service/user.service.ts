import next from "next";
import userDb from "../domain/data-access/user.db";
import { User } from "../domain/model/user";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";

const createUser = async ({ username, password, role, age, weight, height }: UserInput): Promise<User> => {
    try {
        console.log('Checking if user exists...');
        const existingUser = await userDb.getUserByUsername(username);
        console.log('Existing user:', existingUser);

        if (existingUser) {
            console.log(`User with username ${username} already exists`);
            throw new Error(`User with username ${username} already exists`);
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ username, password: hashedPassword, role, age, weight, height });
        console.log('Creating new user...');

        return await userDb.createUser(user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername(username);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return {
        token: generateJwtToken({ username, role: user.role }),
        username
    }
}

const getUserByUsername = async (username: string): Promise<User> => {
    return await userDb.getUserByUsername(username);
}

export default {
    createUser,
    authenticate,
    getUserByUsername
};