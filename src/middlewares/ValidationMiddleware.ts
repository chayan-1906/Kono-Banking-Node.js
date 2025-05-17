import {NextFunction, Request, Response} from "express";
import {Result, ValidationError, validationResult} from "express-validator";
import {ApiError} from "../utils/ApiError";
import {generateInvalidCode} from "../utils/generateErrorCodes";

type ExtendedValidationError = ValidationError & { path: string };

const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result: Result<ValidationError> = validationResult(req);
    const errors = result.array() as ExtendedValidationError[];
    const firstError = errors[0];

    if (!result.isEmpty()) {
        console.log('result in validationMiddleware:'.bgMagenta.white.italic, firstError.path);
        // throw new ApiError('', result.array()[0].msg, 400);
        return next(new ApiError(generateInvalidCode(firstError.path), firstError.msg, 400));
    }

    next();
}

export {validationMiddleware};
