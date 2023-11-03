import { Request, Response } from "express";
import * as orderServices from '../services/order.service';

interface CartItem {
    productId: string;
    userId: string;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}

export const addOrder = async (req: Request, res: Response) => {
    try {
        const { totalAmount, shippingAddress, orderDetails } = req.body;

        const userId = res.locals.middlewareData;
        const orderResult: any = await orderServices.addOrder(
            userId,
            totalAmount,
            shippingAddress
        );
        const insertOrderId: any = orderResult[0].insertId;


        const orderDetailValues = orderDetails.map((item: CartItem) => [
            insertOrderId,
            item.productId,
            item.productName,
            item.price,
            item.image,
            item.quantity,
        ]);
        await orderServices.addOrderDetail(orderDetailValues);

        res.status(201).json({
            message: "Add order detail successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const findAllOrders = async (req: Request, res: Response) => {
    try {
        let data = await orderServices.findAllOrders();
        let [rows] = data;

        res.json(
            rows
        );
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const findOneOrderDetail = async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        let data = await orderServices.findOneOrderDetail(+id);
        let [rows] = data;

        res.json(rows);
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { value } = req.body;
    try {
        await orderServices.updateStatus(+value, +id);
        res.status(200).json({
            message: "Update status login successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const findAllOrdersByUserId = async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        let result: any = await orderServices.findAllOrdersByUserId(+id);
        res.status(200).json(result[0]);
    } catch (error) { }
};