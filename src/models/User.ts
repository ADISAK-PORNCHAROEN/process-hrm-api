export interface IUser {
    id: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserSafe {
    id: number;
    email: string;
    fname: string;
    lname: string;
    role: string;
}

export interface IUserLogin {
    id: number;
    email: string;
    password: string;
}


export interface IUserChangePassword {
    id: number;
    email: string;
    password: string;
    newPassword: string;
}