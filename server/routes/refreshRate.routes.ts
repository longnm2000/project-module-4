import express from 'express';
import { Request, Response } from 'express';
import { findAllRefreshRates } from '../controllers/refreshRate.controller';


const router = express.Router();

router.get("/", (req: Request, res: Response) => findAllRefreshRates(req, res));

export default router;