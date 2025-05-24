import bcrypt from 'bcryptjs';
import UserModel from "../models/User.model";
import {ApiError} from '../utils/ApiError';
import {JwtService} from "../utils/JwtService";
import {generateInvalidCode, generateNotFoundCode} from "../utils/generateErrorCodes";

class AuthService {
    static async loginUser(body: any) {
        const {email, password} = body;

        const checkExistingEmail = await UserModel.findOne({email: email.toLowerCase()});
        if (!checkExistingEmail) {
            throw new ApiError(generateNotFoundCode('user'), 'User not found', 400);
        }
        const isMatched = await bcrypt.compare(password, checkExistingEmail.password);
        if (!isMatched) {
            console.log('checkExistingEmail:', checkExistingEmail);
            throw new ApiError(generateInvalidCode('credentials'), 'Invalid credentials', 400);
        }

        const token = JwtService.generateToken(checkExistingEmail._id.toString());

        return {user: checkExistingEmail, token};
    }

    static async registerUser(body: any) {
        const {name, email, password, acc_type} = body;

        const checkExistingEmail = await UserModel.findOne({email: email.toLowerCase()});
        if (checkExistingEmail) {
            throw new ApiError('emailAlreadyExists', 'Email already registered', 400);
        }

        const user = await UserModel.create({
            name, email, password, acc_type,
        });
        console.log('user created:', user);

        return user;
    }

    static async profileUser(userId: string) {
        const user = await UserModel.findById(userId).select('name email acc_type -_id');
        if (!user) {
            throw new ApiError(401, 'Profile not found');
        }

        return user;
    }
}

export default AuthService;
