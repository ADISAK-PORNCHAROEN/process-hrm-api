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
            },
            orderBy: {
                id: 'asc'
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

    async findId(userId: number): Promise<IUser | null> {
        const existingId = await this.model.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true
            }
        })
        return existingId
    }

    async updateUser(userId: number, user: IUser): Promise<IUser | null> {
        const editUser = await this.model.update({
            where: {
                id: userId
            },
            data: {
                email: user.email,
                name: user.name,
                updatedAt: user.updatedAt
            }
        })
        return editUser
    }

    async deleteUser(userId: number): Promise<IUser> {
        const deleteUser = await this.model.delete({
            where: {
                id: userId,
            }
        })

        return deleteUser
    }

    async findAll(searchQuery: string, emailQuery: string, sortQuery: string): Promise<IUser[]> {
        // ถ้ามี emailQuery ให้ทำการ search name หรือ ถ้าไม่มี emailQuery ให้ทำการ search email และ name
        let whereCondition = emailQuery ? {
            email: { contains: emailQuery, mode: "insensitive" } as Object,
            name: {
                contains: searchQuery,
                mode: "insensitive"
            } as Object
        } : {
            OR: [{
                email: {
                    contains: searchQuery,
                    mode: "insensitive"
                } as Object,
            },
            {
                name: {
                    contains: searchQuery,
                    mode: "insensitive"
                } as Object
            }]
        }

        // ถ้ามี emailQuery ให้ทำการ search name หรือ ถ้าไม่มี emailQuery ให้ทำการ search name
        /* let whereCondition = emailQuery ? {
            email: { contains: emailQuery, mode: "insensitive" } as Object,
            name: {
                contains: searchQuery,
                mode: "insensitive"
            } as Object
        } : {
            name: {
                contains: searchQuery,
                mode: "insensitive"
            } as Object
        } */

        return await this.model.findMany({
            where: whereCondition,
            orderBy: {
                createdAt: sortQuery as 'asc' | 'desc'
            }
        })
    }
}