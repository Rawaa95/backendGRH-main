import express from "express";
import { protect, restricteTo } from "../controllers/authController.js";
import { createOffer } from "../controllers/offerController.js";
import { getOfferById } from "../controllers/offerController.js";
import { getAllOffers } from "../controllers/offerController.js";
import { searchOffers } from "../controllers/offerController.js";

const router = express.Router();

router.post("/", protect, restricteTo("recruter"), createOffer);



export default router;
