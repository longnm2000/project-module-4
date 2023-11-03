import { Request, Response } from "express";
import * as pictureServices from "../services/picture.service";

export const findAllById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const rows = await pictureServices.findAllById(id);
        res.json(rows[0]);
    } catch (error) {
        res.json({ error });
    }
};

