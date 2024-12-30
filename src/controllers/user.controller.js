import { response } from "express";
import { User } from "../models/user.model.js";
import ResponseData from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existUser = await User.findOne({
        $or: [{ email }]
    })

    if (existUser) {
        return ResponseData(response, {
            statusCode: 400,
            message: "Email already exists",
        })
    }

    const user = await User.create({ ...req.body });

    return ResponseData(res, {
        statusCode: 201,
        transaction: user,
        message: "User created successfully",
    });
})