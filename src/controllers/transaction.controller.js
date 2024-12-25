import { Transaction } from "../models/transaction.model";
import ResponseData from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

export const createTransaction = asyncHandler(async (req, res) => {
    const transactionDetails = await Transaction.create(req.body);

    return ResponseData(res, {
        statusCode: 200,
        data: transactionDetails,
        message: "Transaction created successfully",
    })
})

export const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find();

    return ResponseData(res, {
        statusCode: 200,
        data: transactions,
        message: "All transactions retrieved successfully",
    })
})

export const deleteTransaction = asyncHandler(async (req, res) => {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) {
        return ResponseData(res, {
            statusCode: 404,
            message: "Transaction not found",
        })
    }

    return ResponseData(res, {
        statusCode: 200,
        data: deletedTransaction,
        message: "Transaction deleted successfully",
    })
})

export const updateTransaction = asyncHandler(async (req, res) => {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTransaction) {
        return ResponseData(res, {
            statusCode: 404,
            message: "Transaction not found",
        })
    }

    return ResponseData(res, {
        statusCode: 200,
        data: updatedTransaction,
        message: "Transaction updated successfully",
    })
})