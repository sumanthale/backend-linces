import express from "express";
import { create, getById, list } from "../controllers/quoteController.js";
import { validateCreateQuote } from "../validators/quoteValidator.js";

const router = express.Router();

router.post("/", validateCreateQuote, create);

router.get("/", list);

router.get("/:id", getById);

export default router;
