import express from "express";
import { create, getAdminQuoteById, getAllQuotes, getById, list, updateQuoteStatus } from "../controllers/quoteController.js";
import { validateCreateQuote } from "../validators/quoteValidator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", validateCreateQuote, create);

router.get("/", list);

router.get("/all", getAllQuotes);

router.get("/:id", getById);

router.get("/all/:id", getAdminQuoteById);

router.put(
  "/admin/:id/status",
  updateQuoteStatus
);

export default router;
