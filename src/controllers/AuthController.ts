import {Request, Response} from "express";
import AuthService from "../services/AuthService";
import {ApiResponse} from "../utils/ApiResponse";
import {ApiError} from "../utils/ApiError";

class AuthController {
    static async loginUser(req: Request, res: Response) {
        try {
            const user = await AuthService.loginUser(req.body);
            return res.status(200).send(new ApiResponse({
                success: true,
                message: 'Login successful',
                user,
            }));
        } catch (error: any) {
            console.log('error:', error);
            console.log('statusCode:', error.statusCode);
            console.log('message:', error.message);
            console.log('instance:', error instanceof ApiError);
            const statusCode = error instanceof ApiError ? error.statusCode : 500;

            return res.status(statusCode).send(new ApiResponse({
                success: false,
                errorCode: error instanceof ApiError ? error.errorCode : 'unknownError',
                errorMsg: error instanceof ApiError ? error.message : 'Internal server error',
            }));
        }
    }

    static async registerUser(req: Request, res: Response) {
        try {
            const user = await AuthService.registerUser(req.body);
            return res.status(201).send(new ApiResponse({
                success: true,
                message: 'Registration successful',
                user,
            }));
        } catch (error: any) {
            console.log('error:', error);
            console.log('statusCode:', error.statusCode);
            console.log('message:', error.message);
            console.log('instance:', error instanceof ApiError);
            const statusCode = error instanceof ApiError ? error.statusCode : 500;

            return res.status(statusCode).send(new ApiResponse({
                success: false,
                errorCode: error instanceof ApiError ? error.errorCode : 'unknownError',
                errorMsg: error instanceof ApiError ? error.message : 'Internal server error',
            }));
        }
    }
}

export default AuthController;
