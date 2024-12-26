import { Router } from "express";
import transactions from "./transaction.routes.js";

const router = Router();

router.use("/transactions", transactions);

export default router;