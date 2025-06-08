import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

// login & register
router.post('/createUser', userController.createUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));
router.patch('/changePassword/:id', authenticate, userController.changePassword.bind(userController));

// user route
router.get('/users', authenticate, authorize(["Admin"]), userController.getAllUser.bind(userController));
router.get('/user/:id', authenticate, userController.getUserId.bind(userController));
router.put('/user/:id', authenticate, userController.updateUser.bind(userController));
router.delete('/user/:id', authenticate, userController.deleteUser.bind(userController));
router.get('/user', authenticate, authorize(["Admin"]), userController.findAll.bind(userController));

export default router;