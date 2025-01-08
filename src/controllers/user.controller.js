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
        return ResponseData(res, {
            statusCode: 400,
            message: "Email already exists",
        })
    }

    const user = await User.create({ ...req.body });

    return ResponseData(res, {
        statusCode: 201,
        data: user,
        message: "Registered successfully",
    });
})

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return ResponseData(response, {
            statusCode: 500,
            message: "Error generating tokens",
        })
    }
}

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password))) {
        return ResponseData(res, {
            statusCode: 400,
            message: "Invalid email or password",
        })
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "Strict",
    });

    const loginDatails = await User.findOne({ email });

    return ResponseData(res, {
        statusCode: 200,
        data: loginDatails,
        message: "User logged in successfully",
    });

})

export const logoutUser = asyncHandler(async (req, res) => {


    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'Strict' });

    if (req.user?._id) {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: null } },
            { new: true }
        )
    }

    return ResponseData(res, {
        statusCode: 200,
        message: "User logged out successfully",
    });
})