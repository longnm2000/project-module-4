import { Request, Response } from 'express';
import moment from 'moment';
import * as authService from '../services/auth.service';

interface SignUpRequestBody {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
}

interface SignInRequestBody {
    email: string;
    password: string;
}

export const signUp = async (req: Request, res: Response) => {
    const {
        lastName,
        firstName,
        email,
        password,
        gender,
        phone,
    }: SignUpRequestBody = req.body;


    try {
        const result: any = await authService.signUp(
            lastName,
            firstName,
            email,
            password,
            gender,
            phone
        );
        console.log(result);
        if (typeof result === "object" && result.status === 409) {
            res.status(200).json({
                message: "Duplicate email",
            });
        } else {
            res.status(201).json({
                message: "Sign up successfully",
            });
        }
    } catch (error) {
        console.error("Error while signing up:", error);
        res.json({
            message: "Failed to sign up",
            error: error,
            status: 500,
        });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password }: SignInRequestBody = req.body;
    try {
        const result = await authService.signIn(email, password);
        console.log(result);

        res.json(result);
    } catch (error) {
        res.json({
            message: "Failed to sign in",
            error: error,
            status: 500,
        });
    }
};

export const signInAdmin = async (req: Request, res: Response) => {
    const { email, password }: SignInRequestBody = req.body;
    try {
        const result = await authService.signInAdmin(email, password);
        res.json(result);
    } catch (error) {
        res.json({
            message: "Failed to sign in",
            error: error,
            status: 500,
        });
    }
};

export const signupAdmin = async (req: Request, res: Response) => {
    const { email, password }: SignInRequestBody = req.body;
    try {
        await authService.signupAdmin(email, password);
        res.status(201).json({
            message: "Sign up successfully",
            status: 201,
        });
    } catch (error) {
        console.error("Error while signing up:", error);
        res.json({
            message: "Failed to sign up",
            error: error,
            status: 500,
        });
    }
};
