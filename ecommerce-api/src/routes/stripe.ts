import express from "express";
import { createCheckoutSession, updateOrderAndStock } from "../controllers/checkoutController";

const router = express.Router();

router.post("/create-checkout-session-embedded", createCheckoutSession)
router.post("/webhook", updateOrderAndStock)

export default router;