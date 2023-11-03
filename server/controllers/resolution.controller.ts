import { Request, Response } from "express";
import * as resolutionServices from "../services/resolution.service"
export const findAllResolutions = async (req: Request, res: Response) => {
    try {
        const [result] = await resolutionServices.findAllResolutions();
        res.status(200).json(result);
    } catch (error) {
        res.json({
            error,
        });
    }
};