import {body} from "express-validator";

class AuthValidation {
    static loginUser = [
        body('email').notEmpty().withMessage('Email address is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ];

    static registerUser = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email address is required').toLowerCase(),
        body('password').notEmpty().withMessage('Password is required'),
        body('acc_type').notEmpty().withMessage('Account type is required').isIn(['savings', 'current']).withMessage('Account should be a valid string, either savings or current'),
    ];
}

export {AuthValidation};
