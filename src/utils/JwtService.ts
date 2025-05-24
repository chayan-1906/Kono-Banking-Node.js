import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/config";

class JwtService {
    static generateToken(userId: string) {
        console.log('userId:', userId);
        const token = jwt.sign({userId}, JWT_SECRET!, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });

        return token;
    }

    static validateToken(token: any) {
        const data = jwt.verify(token, JWT_SECRET!);
        return data;
    }
}

export {JwtService}
