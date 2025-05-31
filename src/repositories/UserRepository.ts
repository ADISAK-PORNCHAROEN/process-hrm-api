import { create } from "domain";
import prisma from "../config/prismaClient";
import { IUser } from "../models/User";

export class UserRepository {
    protected model = prisma.user;

    async getAllUser(): Promise<IUser[]> {
        return await this.model.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async getUserId(id: number): Promise<IUser | null> {
        return await this.model.findUnique({
            where: {
                id: id
            }
        });
    }

    async createUser(user: IUser): Promise<IUser> {
        return await this.model.create({ data: user });
    }

    async findEmail(user: IUser): Promise<IUser | null> {
        const existingUser = await this.model.findFirst({
            where: {
                email: user.email
            }
        })
        return existingUser
    }
}