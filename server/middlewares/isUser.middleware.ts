import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userServices from "../services/user.service";

const isUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (process.env.TOKEN_SECRET) {
            const token: string = req.headers.authorization?.split(" ")[1]?.trim() || "";
            const result: any = jwt.verify(token, process.env.TOKEN_SECRET);

            const { id }: { id: number } = result.data;
            const [user]: any = await userServices.findOne(id);
            if (+user[0].isLogin === 1) {
                res.locals.middlewareData = id;
                next();

            } else {
                res.status(203).json({
                    message: "Unauthorized",
                });
            }
        } else {
            res.json({ message: "TOKEN_SECRET NOT FOUND" })
        }

    } catch (error) {
        res.json({
            error,
        });
    }
};

export default isUser
