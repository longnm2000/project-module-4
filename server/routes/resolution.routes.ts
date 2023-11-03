import express from 'express';
import { Request, Response } from 'express';
import { findAllResolutions } from '../controllers/resolution.controller';

const router = express.Router();

router.get("/", (req: Request, res: Response) => findAllResolutions(req, res));

export default router;