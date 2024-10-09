import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();
router.post("/confirmation", paymentController.confirmtionController);
export const paymentRoute = router;
