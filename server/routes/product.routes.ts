import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import { addProduct, deleteProduct, findAll, findOneById } from '../controllers/product.controller';

router.get("/", (req: Request, res: Response) => findAll(req, res));
router.get("/:id", (req: Request, res: Response) => findOneById(req, res));
router.post("/", (req: Request, res: Response) => addProduct(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteProduct(req, res));

export default router;