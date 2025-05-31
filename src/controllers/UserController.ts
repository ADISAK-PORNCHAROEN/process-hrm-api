import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUser()
            res.status(200).json({
                success: true,
                message: "GetAll users success",
                data: users
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    async getUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id)
            const users = await this.userService.getUserId(userId)
            res.status(200).json({
                success: true,
                message: "Get user success",
                data: users
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const createUser = await this.userService.createUser(body);
            console.log("controller: ", createUser)

            res.status(201).json({
                success: true,
                message: "Create user success",
                data: createUser
            });
        } catch (error: any) {
            const statusCode = error.message === 'Email already exists' ? 400 : 500;
            const message = error.message === 'Email already exists'
                ? "Email already exists"
                : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message: message
            });
        }
    }
}