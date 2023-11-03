import { Request, Response } from "express";
import * as refreshRateServices from "../services/refreshRate.service"
export const findAllRefreshRates = async (req: Request, res: Response) => {
    try {
        const [result] = await refreshRateServices.findAllRefreshRates();
        res.status(200).json(result);
    } catch (error) {
        res.json({
            error,
        });
    }
};