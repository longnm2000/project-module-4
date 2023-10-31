import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import { findAll } from '../controllers/product.controller';

router.get("/", (req: Request, res: Response) => findAll(req, res));

export default router;