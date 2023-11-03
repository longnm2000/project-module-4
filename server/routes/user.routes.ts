import express from 'express';
import { Request, Response } from 'express';
import { findAll, update } from '../controllers/user.controller';
const router = express.Router();

router.get("/", (req: Request, res: Response) => findAll(req, res));
router.patch("/:id", (req: Request, res: Response) => update(req, res));

export default router;