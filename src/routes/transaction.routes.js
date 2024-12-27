import { Router } from "express";
import { createTransaction, deleteTransaction, getAllTransactions, getAnalytics, updateTransaction } from "../controllers/transaction.controller.js";

const router = Router();

router.get("/", getAllTransactions);
router.post("/", createTransaction);
router.put("/:_id", updateTransaction);
router.delete("/:_id", deleteTransaction);
router.get("/list", getAnalytics);

export default router;