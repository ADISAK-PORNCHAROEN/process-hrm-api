import { Router } from "express";
import { UserController } from "../controllers/UserController";


const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUser.bind(userController));
router.get('/user/:id', userController.getUserId.bind(userController));
router.post('/createUser', userController.createUser.bind(userController));
router.put('/user/:id', userController.updateUser.bind(userController));
router.delete('/user/:id', userController.deleteUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));
router.get('/user', userController.findAll.bind(userController));
router.patch('/changePassword/:id', userController.changePassword.bind(userController));

export default router;