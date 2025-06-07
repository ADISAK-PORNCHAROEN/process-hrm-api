import prisma from "../config/prismaClient";
import { IUser, IUserChangePassword, IUserLogin, IUserSafe } from "../models/User";

export class UserRepository {
    protected model = prisma.user;

    async getAllUser(): Promise<IUser[]> {
        return await this.model.findMany({
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
                fname: user.fname,
                lname: user.lname,
                role: user.role,
                updatedAt: user.updatedAt
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

    async findAll(searchQuery: string, emailQuery: string, sortQuery: string): Promise<IUser[]> {
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

        // let whereCondition: object = {};

        // if (emailQuery === "email") {
        //     whereCondition = {
        //         email: {
        //             contains: searchQuery,
        //             mode: "insensitive"
        //         }
        //     };
        // } else if (emailQuery === "name") {
        //     whereCondition = {
        //         name: {
        //             contains: searchQuery,
        //             mode: "insensitive"
        //         }
        //     };
        // }

        // ถ้ามี emailQuery ให้ทำการ search name หรือ ถ้าไม่มี emailQuery ให้ทำการ search name
        let whereCondition: Object = emailQuery ? {
            email: { contains: emailQuery, mode: "insensitive" },
            name: {
                contains: searchQuery,
                mode: "insensitive"
            }
        } : {
            name: {
                contains: searchQuery,
                mode: "insensitive"
            }
        }

        return await this.model.findMany({
            where: whereCondition,
            orderBy: {
                createdAt: sortQuery as 'asc' | 'desc'
            }
        })
    }
}