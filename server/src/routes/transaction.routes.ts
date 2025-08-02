import express from "express";
import {
  createTransaction,
  getTransactions,
  updateIsVerified,
  updateTransaction,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);
router.patch("/:id/verify", updateIsVerified);

export default router;
