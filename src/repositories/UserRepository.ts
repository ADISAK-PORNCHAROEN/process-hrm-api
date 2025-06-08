import prisma from "../config/prismaClient";
import { IUser, IUserChangePassword, IUserLogin, IUserSafe } from "../models/User";

export class UserRepository {
    protected model = prisma.user;

    async getAllUser(): Promise<IUserSafe[]> {
        return await this.model.findMany({
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                email: true,
                password: false,
                fname: true,
                lname: true,
                role: true
            }
        });
    }

    async getUserId(id: number): Promise<IUserSafe | null> {
        return await this.model.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                password: false,
                fname: true,
                lname: true,
                role: true
            }
        });
    }

    async createUser(user: IUser): Promise<IUserSafe> {
        return await this.model.create({
            data: {
                email: user.email,
                password: user.password,
                fname: user.fname,
                lname: user.lname,
                role: user.role
            },
            select: {
                id: true,
                email: true,
                password: false,
                fname: true,
                lname: true,
                role: true
            }
        });
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
            }
        })
        return existingId
    }

    async updateUser(userId: number, user: IUser): Promise<IUserSafe | null> {
        const editUser = await this.model.update({
            where: {
                id: userId
            },
            data: {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                role: user.role,
                updatedAt: user.updatedAt
            },
            select: {
                id: true,
                email: true,
                password: false,
                fname: true,
                lname: true,
                role: true
            }
        })
        return editUser
    }

    async updatePassword(user: IUserChangePassword): Promise<IUser | null> {
        const editPassword = await this.model.update({
            where: {
                id: user.id
            },
            data: {
                password: user.newPassword
            }
        })
        return editPassword
    }

    async deleteUser(userId: number): Promise<IUser> {
        const deleteUser = await this.model.delete({
            where: {
                id: userId,
            }
        })

        return deleteUser
    }

    async findAll(searchQuery: string, typeQuery: string, sortQuery: string): Promise<IUserSafe[]> {
        // ถ้ามี emailQuery ให้ทำการ search name หรือ ถ้าไม่มี emailQuery ให้ทำการ search email และ name
        /* let whereCondition: Object = emailQuery ? {
            email: { contains: emailQuery, mode: "insensitive" },
            name: {
                contains: searchQuery,
                mode: "insensitive"
            }
        } : {
            OR: [{
                email: {
                    contains: searchQuery,
                    mode: "insensitive"
                },
            },
            {
                name: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            }]
        } */

       // searchtype ถ้าเราส่ง type มาแบบนี้ให้ทำการ search แต่ละ type ที่ส่งผ่าน typeQuery
        const dataType = ["email", "fname", "lname", "role"];

        let whereCondition: object = {};

        if (typeQuery && dataType.includes(typeQuery)) {
            whereCondition = {
                [typeQuery]: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            };
        }

        return await this.model.findMany({
            where: whereCondition,
            orderBy: {
                createdAt: sortQuery as 'asc' | 'desc'
            },
            select: {
                id: true,
                email: true,
                password: false,
                fname: true,
                lname: true,
                role: true
            }
        })
    }
}