import UserModel from "../models/User.model";
import {ApiError} from '../utils/ApiError';
import {generateInvalidCode, generateNotFoundCode} from "../utils/generateErrorCodes";
import bcrypt from 'bcryptjs';

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

        return checkExistingEmail;
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
}

export default AuthService;
