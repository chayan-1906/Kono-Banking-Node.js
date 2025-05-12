import {Request, Response} from "express";

function testUserController(req: Request, res: Response) {
    try {
        res.status(200).send({
            success: true,
            message: 'test user data API',
        });
    } catch (error) {
        console.log('inside catch of testUserController:'.bgRed.white.bold, error);
    }
}

export {testUserController};
