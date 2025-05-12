import {Router} from 'express';
import AuthController from "../controllers/AuthController";

const router = Router();

// routes
router.get('/login', AuthController.loginUser);

export default router;
