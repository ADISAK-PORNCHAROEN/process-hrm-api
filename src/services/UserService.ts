import { error } from "console";
import { IUser, IUserChangePassword, IUserLogin, IUserSafe } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    protected userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository
    }

    async getAllUser(): Promise<IUserSafe[]> {
        try {
            const users = await this.userRepository.getAllUser();

            return users
        } catch (error: unknown) {
            throw error;
        }
    }

    async getUserId(id: number): Promise<IUserSafe | null> {
        const userId = await this.userRepository.getUserId(id);
        return userId
    }

    async createUser(user: IUser): Promise<IUserSafe | null> {
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

    async updateUser(userId: number, user: IUser): Promise<IUserSafe | null> {
        try {
            const existingId = await this.userRepository.findId(userId)

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

            const { email } = user;

            // ข้อมูล | key | การเข้าถึงข้อมูลและกำหนดระยะเวลาข้อมูลแล้วเราก็จะได้ token ออกมา
            const token: any = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: "1h" })

            return token
        } catch (error: unknown) {
            throw error
        }
    }

    async changePassword(userId: number, user: IUserChangePassword): Promise<IUser | null> {
        try {
            const existingId = await this.userRepository.findId(userId)

            const isValidPassword = await bcrypt.compare(user.password, existingId?.password!)

            if (existingId?.id !== Number(user.id) || !isValidPassword) {
                throw new Error("Something is wrong email or password")
            }

            const salt = await bcrypt.genSalt(10);
            user.newPassword = await bcrypt.hash(user.newPassword, salt);

            const updatePassword = await this.userRepository.updatePassword(user)

            return updatePassword
        } catch (error: unknown) {
            throw error
        }
    }

    async findAll(searchQuery: string, typeQuery: string, sort: string): Promise<IUserSafe[]> {
        try {
            const search = await this.userRepository.findAll(searchQuery, typeQuery, sort)
            return search
        } catch (error: unknown) {
            throw error
        }
    }
}