import { Transaction } from "../models/transaction.model.js";
import ResponseData from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTransaction = asyncHandler(async (req, res) => {
    const transactionDetails = await Transaction.create(req.body);

    return ResponseData(res, {
        statusCode: 200,
        transaction: transactionDetails,
        message: "Transaction created successfully",
    })
})

export const getAllTransactions = asyncHandler(async (req, res) => {
    let { search } = req.query;

    const searchTransactions = search ? {
        $or: [
            { type: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ],
    } : {};

    const transactions = await Transaction.find(searchTransactions);

    return ResponseData(res, {
        statusCode: 200,
        transaction: transactions,
        message: "All transactions retrieved successfully",
    })
})

export const deleteTransaction = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(_id);

    if (!deletedTransaction) {
        return ResponseData(res, {
            statusCode: 404,
            message: "Transaction not found",
        })
    }

    return ResponseData(res, {
        statusCode: 200,
        transaction: deletedTransaction,
        message: "Transaction deleted successfully",
    })
})

export const updateTransaction = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const updatedTransaction = await Transaction.findByIdAndUpdate(_id, req.body, { new: true });

    if (!updatedTransaction) {
        return ResponseData(res, {
            statusCode: 404,
            message: "Transaction not found",
        })
    }

    return ResponseData(res, {
        statusCode: 200,
        transaction: updatedTransaction,
        message: "Transaction updated successfully",
    })
})

export const getAnalytics = asyncHandler(async (req, res) => {
    const transaction = await Transaction.find();

    const incomeTransactions = transaction.filter((transaction) => transaction.type === 'Income');
    const expenseTransactions = transaction.filter((transaction) => transaction.type === 'Expense');

    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    const netAmount = totalIncome - totalExpense;

    const nameIncomeData = [];
    const nameExpenseData = [];

    incomeTransactions.forEach(transaction => {
        nameIncomeData.push(transaction.description);
    })

    expenseTransactions.forEach(transaction => {
        nameExpenseData.push(transaction.description);
    })

    const sepIncomeData = [];
    const sepExpenseData = [];

    incomeTransactions.forEach(transaction => {
        sepIncomeData.push(transaction.amount);
    });

    expenseTransactions.forEach(transaction => {
        sepExpenseData.push(transaction.amount);
    });

    const analyticsData = {
        sepIncomeData,
        sepExpenseData,
        nameIncomeData,
        nameExpenseData,
        totalIncome,
        totalExpense,
        netAmount,
    }

    return ResponseData(res, {
        statusCode: 200,
        transaction: analyticsData,
        message: "Analytics retrieved successfully",
    })
})