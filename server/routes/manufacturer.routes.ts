import express from 'express';
import { Request, Response } from 'express';
import { addManufacturer, deleteManufacturer, findAllManufacturers, findOneManufacturer, updateManufacturer } from '../controllers/manufacturer.controller';
const router = express.Router();

router.get("/", (req: Request, res: Response) => findAllManufacturers(req, res));
router.get("/:id", (req: Request, res: Response) => findOneManufacturer(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteManufacturer(req, res));
router.post("/", (req: Request, res: Response) => addManufacturer(req, res));
router.patch("/:id", (req: Request, res: Response) => updateManufacturer(req, res));
export default router;