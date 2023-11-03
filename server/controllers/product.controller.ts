import { Request, Response } from "express";
import * as productServices from "../services/product.service";
import * as pictureServices from "../services/picture.service";

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

export const findOneById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const rows: any = await productServices.findOneById(id);
        res.json(rows[0][0]);
    } catch (error) {
        res.json({
            error,
        });
    }

}

export const addProduct = async (req: Request, res: Response) => {
    let {
        manufacturerId,
        name,
        detail,
        description,
        size,
        resolutionId,
        refreshRateId,
        quantity,
        price,
        avatar,
        optionalImages
    } = req.body;
    try {
        const result: any = await productServices.addProduct(
            manufacturerId,
            name,
            detail,
            description,
            size,
            resolutionId,
            refreshRateId,
            quantity,
            price,
        );
        const result2: any = await pictureServices.addAvatar(result[0].insertId, avatar);
        console.log(result2);

        if (optionalImages.length !== 0) {
            await pictureServices.addOptionalImages(result[0].insertId, optionalImages);
        }
        console.log("c");
        res.status(201).json({
            status: "success",
            message: "Add new product successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await productServices.deleteProduct(id);
        res.status(200).json({
            status: "success",
            message: `Delete the product has productId = ${id} successfully`,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};