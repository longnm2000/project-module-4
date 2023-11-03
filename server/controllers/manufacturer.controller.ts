import { Request, Response } from "express";
import * as manufacturerServices from "../services/manufacturer.service"
export const findAllManufacturers = async (req: Request, res: Response) => {
    try {
        const [result] = await manufacturerServices.findAllManufacturers();
        res.status(200).json(result);
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const deleteManufacturer = async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        await manufacturerServices.deleteManufacturer(+id);
        res.status(200).json({
            status: "success",
            message: `Delete manufacturer has id = ${id} successfully!`,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const addManufacturer = async (req: Request, res: Response) => {
    let { name } = req.body;
    try {
        const result: any = await manufacturerServices.addManufacturer(name);
        if (result[0][0].insertId) {
            res.status(201).json({
                status: "success",
                message: "Add new product successfully",
            });
        }
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const updateManufacturer = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { name } = req.body;
    try {
        await manufacturerServices.updateManufacturer(+id, name);
        res.status(200).json({
            status: "sucess",
            message: `Update manufacturer has id = ${id} successfully!`,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const findOneManufacturer = async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const result: any = await manufacturerServices.findOneManufacturer(+id);
        res.status(200).json(result[0][0]);
    } catch (error) {
        res.json({
            error,
        });
    }
};