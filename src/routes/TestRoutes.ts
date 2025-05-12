import {Router} from 'express';
import {testUserController} from "../controllers/TestController";

const router = Router();

// routes
router.get('/test-user', testUserController);

export default router;
