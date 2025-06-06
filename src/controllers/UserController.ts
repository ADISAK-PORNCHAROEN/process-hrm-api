import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import APIResponse from "../helper/ApiResponse";
import { IUser } from "../models/User";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUser()
            const response = APIResponse.success("GetAll users success", users)
            res.status(200).json(response)
        } catch (error) {
            const response = APIResponse.error("Internal server error")
            res.status(500).json(response)
        }
    }

    async getUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id)
            const users = await this.userService.getUserId(userId)
            const response = APIResponse.success("Get user success", users)
            res.status(200).json(response)
        } catch (error) {
            const response = APIResponse.error("Internal server error")
            res.status(500).json(response)
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            console.log("body", body)
            const createUser = await this.userService.createUser(body);
            const response = APIResponse.success("Create user success", createUser)
            res.status(201).json(response);

        } catch (error: unknown) {
            const message = (error instanceof Error && error.message === 'Email already exists')
                ? 'Email already exists'
                : 'Internal server error';

            const statusCode = (message === 'Email already exists') ? 400 : 500;

            const response = APIResponse.error(message);
            res.status(statusCode).json(response);
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const userBody = req.body;
            const updateUser = await this.userService.updateUser(userId, userBody)
            const response = APIResponse.success("Update user success", updateUser)
            res.status(200).json(response)
        } catch (error: unknown) {
            console.log("controll", (error as any).message)
            const message = (error instanceof Error && error.message === "Not founded")
                ? "Not Founded"
                : "Internal server error";

            const statusCode = (message === 'Not Founded') ? 400 : 500;

            const response = APIResponse.error(message)

            res.status(statusCode).json(response)
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id)
            const deleteUser = await this.userService.deleteUser(userId)
            const response = APIResponse.success("Delete user success")
            res.status(200).json(response)
        } catch (error: unknown) {
            console.log("controll", (error as any).message)
            const message = (error instanceof Error && error.message === "Not founded")
                ? "Not Founded"
                : "Internal server error";

            const statusCode = (message === 'Not Founded') ? 400 : 500;

            const response = APIResponse.error(message)

            res.status(statusCode).json(response)
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const loginUser = await this.userService.loginUser(body);
            const response = APIResponse.success("Login success")
            res.status(200).json(response);
        } catch (error: unknown) {
            const message = (error instanceof Error && error.message === "Something is wrong email or password")
                ? "Something is wrong email or password"
                : "Internal server error";

            const statusCode = (message === 'Something is wrong email or password') ? 403 : 500;

            const response = APIResponse.error(message)

            res.status(statusCode).json(response)
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const searchQuery = req.query.search as string;
        const emailQuery = req.query.email as string;
        const sortQuery = req.query.sort as string;
        const search = await this.userService.findAll(searchQuery, emailQuery, sortQuery);
        const response = APIResponse.success("Search user success", search)
        res.status(200).json(response);
    }
}