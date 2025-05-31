import { create } from "domain";
import { IUser, IUserResponse } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    protected userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository
    }

    async getAllUser(): Promise<IUser[]> {
        const users = await this.userRepository.getAllUser();

        // Format response data
        return users.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name || 'No name provided'
        }));
    }

    async getUserId(id: number): Promise<IUser | null> {
        const userId = await this.userRepository.getUserId(id);
        return userId
    }

    async createUser(user: IUser): Promise<IUser | null> {
        try {
            const existingEmail = await this.userRepository.findEmail(user)

            if(existingEmail) {
                throw new Error("Email already existing!")
            }

            const createUser = await this.userRepository.createUser(user);
            return createUser;
        } catch (error: unknown) {
            throw new Error("Email already exists");
        }
    }
}