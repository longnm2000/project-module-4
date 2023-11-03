import { Request, Response } from 'express';
import * as userService from '../services/user.service';
export const findAll = async (req: Request, res: Response) => {
    try {
        let data = await userService.findAll();
        let [rows] = data;

        res.json(rows);
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const update = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { isLogin } = req.body;
    console.log(id, isLogin);
    try {
        await userService.update(id, isLogin);
        res.json({
            message: "Update status login successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};