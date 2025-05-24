import {NextFunction, Request, Response} from "express";
import JWT from 'jsonwebtoken';
import {JWT_SECRET} from "../config/config";
import {ApiResponse} from "../utils/ApiResponse";
import {generateInvalidCode, generateMissingCode} from "../utils/generateErrorCodes";
import {ApiError} from "../utils/ApiError";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            // throw new ApiError(401, 'Enter valid token');
            res.status(401).json(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('auth_token'),
                errorMsg: 'Invalid token. Authorization denied',
            }));
            return;
        }

        // const payload = JwtService.validateToken(token);
        const decoded = await new Promise<JWT.JwtPayload>((resolve, reject) => {
            JWT.verify(token!, JWT_SECRET!, (err: JWT.VerifyErrors | null, decoded: JWT.JwtPayload | string | undefined) => {
                if (err) {
                    reject(err);
                } else if (!decoded || typeof decoded === 'string') {
                    reject(new Error('Invalid token payload'));
                } else {
                    resolve(decoded);
                }
            });
        });

        req.body.userId = decoded.userId;
        next();
    } catch (error: any) {
        console.error('Error in authMiddleware:', error);
        next(error);
        return res.status(500).send(new ApiResponse({
            success: false,
            errorCode: generateInvalidCode('auth_token'),
            errorMsg: 'Invalid token. Authorization denied',
        }));
    }
}

export {authMiddleware}
