import { Router } from "express";
import { UserController } from "../controllers/UserController";


const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUser.bind(userController));
router.get('/user/:id', userController.getUserId.bind(userController));
router.post('/createUser', userController.createUser.bind(userController));

export default router;