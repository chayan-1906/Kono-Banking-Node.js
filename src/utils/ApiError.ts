export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string | number;
    public readonly errorMsg: string | null;

    constructor(errorCode: string | number, errorMsg: string | null, statusCode = 400) {
        super(errorMsg ?? 'Error');

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            errorCode: this.errorCode,
            errorMsg: this.errorMsg,
            statusCode: this.statusCode,
        };
    }
}
