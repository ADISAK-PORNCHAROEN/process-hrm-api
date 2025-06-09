import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../models/User";
import jwt from "jsonwebtoken";

const userRepository = new UserRepository;

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {

    // เป็นวิธีการใช้แบบ cookie
    const authHeader = req.cookies.token;

    // เป็นวิธี login ด้วยการใช้ bearer token
    // // เอาข้อมูลของ token ที่จำเป็นมาใช้งาน
    // let token = req.headers.authorization?.split(" ")[1]

    // // เช็คว่า token นี้ไม่ได้มาจากระบบเราจริงๆให้ message ออกไป
    if (!authHeader) {
        res.status(401).json({ message: 'Token required' });
        return;
    }

    try {
        // ทำการเช็คว่า token ที่ใส่เข้ามาเนี่ยเป็น authToken จากระบบของเราด้วยการ verify
        const decoded = jwt.verify(authHeader, process.env.SECRET_KEY!);

        // เช็คว่า token ที่ใส่เข้ามาถูกต้องหรือไม่
        const findingEmail = userRepository.findEmail(decoded as IUser);

        // เช็คข้อมูลว่า token ที่ส่งไปถูกต้องหรือไม่ถ้าไม่ถูกต้องให้ message ออกไป
        if (!findingEmail) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
}

export const authorize = (role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // เอาข้อมูลของ token ที่จำเป็นมาใช้งาน
        let token = req.headers.authorization?.split(" ")[1]

        // เช็คว่า token นี้ไม่ได้มาจากระบบเราจริงๆให้ message ออกไป
        if (!token) {
            res.status(401).json({ message: 'Token required' });
            return;
        }

        try {
            // ทำการเช็คว่า token ที่ใส่เข้ามาเนี่ยเป็น authToken จากระบบของเราด้วยการ verify
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);

            // เช็คว่า token ที่ใส่เข้ามาถูกต้องหรือไม่
            const findingEmail = await userRepository.findEmail(decoded as IUser);

            // เช็คข้อมูลว่า token ที่ส่งไปถูกต้องหรือไม่ถ้าไม่ถูกต้องให้ message ออกไป
            if (!findingEmail) {
                res.status(401).json({ message: "Unauthorized" })
                return;
            }

            // สร้างตัวแปรในการรับเมื่อหาว่า role ที่ใส่เข้ามาถูกต้องหรือไม่
            const founded = role.includes(findingEmail?.role);

            // ถ้าไม่เจอให้ message ออกไป
            if (!founded) {
                res.status(401).json({ message: "Unauthorized" })
                return;
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
    }
}