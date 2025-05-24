import {Router} from 'express';
import AuthController from "../controllers/AuthController";
import {AuthValidation} from "../validations/AuthValidation";
import {validationMiddleware} from "../middlewares/ValidationMiddleware";
import {authMiddleware} from "../middlewares/AuthMiddleware";

const router = Router();

// routes
router.post('/login', AuthValidation.loginUser, validationMiddleware, AuthController.loginUser);
router.post('/register', AuthValidation.registerUser, validationMiddleware, AuthController.registerUser);
router.get('/profile', authMiddleware, AuthController.profileUser);

export default router;
