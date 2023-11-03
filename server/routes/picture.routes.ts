import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import { findAllById } from '../controllers/picture.controller';

router.get("/:id", (req: Request, res: Response) => findAllById(req, res));

export default router;