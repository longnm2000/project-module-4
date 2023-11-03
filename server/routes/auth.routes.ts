import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import {
    signUp,
    signIn,
    signInAdmin,
} from '../controllers/auth.controller';

router.post('/sign-up', (req: Request, res: Response) => signUp(req, res));

router.post('/sign-in', (req: Request, res: Response) => signIn(req, res));

router.post('/admin/sign-in', (req: Request, res: Response) => signInAdmin(req, res));
// router.post('/admin/sign-up', (req: Request, res: Response) => signupAdmin(req, res));

export default router;
