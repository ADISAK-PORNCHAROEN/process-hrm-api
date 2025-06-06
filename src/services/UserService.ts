import { IUser, IUserLogin, IUserSafe } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class UserService {
    protected userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository
    }

    async getAllUser(): Promise<IUser[]> {
        const users = await this.userRepository.getAllUser();
        return users
    }

    async getUserId(id: number): Promise<IUserSafe | null> {
        const userId = await this.userRepository.getUserId(id);
        return userId
    }

    async createUser(user: IUser): Promise<IUser | null> {
        try {
            const existingEmail = await this.userRepository.findEmail(user)

            if (existingEmail) {
                throw new Error("Email already existing")
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

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

    async loginUser(user: IUser): Promise<IUserLogin | null> {
        try {
            const existingEmail = await this.userRepository.findEmail(user)

            const isValidPassword = await bcrypt.compare(user.password, existingEmail?.password!)

            if (!existingEmail || !isValidPassword) {
                throw new Error("Something is wrong email or password")
            }

            return existingEmail
        } catch (error: unknown) {
            throw error
        }
    }

    // async changePassword(user: IUser): Promise<IUserLogin | null> {
    //     try {
    //         const existingEmail = await this.userRepository.findEmail(user)

    //         const isValidPassword = await bcrypt.compare(user.password, existingEmail?.password!)

    //         if (!existingEmail || !isValidPassword) {
    //             throw new Error("Something is wrong email or password")
    //         }

    //         // const updatePassword = await this.userRepository.updatePassword(user)

    //         return existingEmail
    //     } catch (error: unknown) {
    //         throw error
    //     }
    // }

    async findAll(searchQuery: string, emailQuery: string, sort: string): Promise<IUser[]> {
        const search = await this.userRepository.findAll(searchQuery, emailQuery, sort)
        return search
    }
}