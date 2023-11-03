import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { addOrder, findAllOrders, findAllOrdersByUserId, findOneOrderDetail, updateStatus } from '../controllers/order.controller';
import isUser from '../middlewares/isUser.middleware';

router.get("/", (req: Request, res: Response) => findAllOrders(req, res));
router.get("/user/:id", (req: Request, res: Response) => findAllOrdersByUserId(req, res));
router.get("/:id", (req: Request, res: Response) => findOneOrderDetail(req, res));
router.post("/", isUser, (req: Request, res: Response) => addOrder(req, res));
router.patch("/:id", (req: Request, res: Response) => updateStatus(req, res));

export default router;