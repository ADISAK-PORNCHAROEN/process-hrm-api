export interface IUser {
    id: number;
    email: string;
    name?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserResponse {
    id: number;
    email: string;
    name?: string;
}