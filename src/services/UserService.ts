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

            if (existingEmail) {
                throw new Error("Email already existing")
            }

            const createUser = await this.userRepository.createUser(user);
            return createUser;
        } catch (error: unknown) {
            throw error;
        }
    }

    async updateUser(userId: number, user: IUser): Promise<IUser | null> {
        try {
            const existingId = await this.userRepository.findId(userId)
            console.log(existingId)

            if (!existingId) {
                throw new Error("Not founded")
            }

            const updateUser = await this.userRepository.updateUser(userId, user)

            return updateUser
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId: number): Promise<IUser> {
        try {
            const existingId = await this.userRepository.findId(userId);

            if (!existingId) {
                throw new Error("Not founded");
            }

            const deleteUser = await this.userRepository.deleteUser(userId);

            return deleteUser
        } catch (error: unknown) {
            throw error;
        }
    }

    async findAll(searchQuery: string, emailQuery: string, sort: string): Promise<IUser[]> {
        const search = await this.userRepository.findAll(searchQuery, emailQuery, sort)
        return search
    }
}