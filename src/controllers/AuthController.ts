import {Request, Response} from "express";
import AuthService from "../services/AuthService";
import {ApiResponse} from "../utils/ApiResponse";

class AuthController {
    static async loginUser(req: Request, res: Response) {
        const response = await AuthService.loginUser(req.body);
        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Login successful',
            response
        }));
    }
}

export default AuthController;
