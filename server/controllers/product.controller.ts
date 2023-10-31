import { Request, Response } from "express";
import * as productServices from "../services/product.service";

export const findAll = async (req: Request, res: Response) => {
    try {
        const rows = await productServices.findAll();
        res.status(200).json({
            status: "success",
            products: rows[0],
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};
