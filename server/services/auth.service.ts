import * as bcrypt from "bcrypt";
import * as userService from "./user.service";
import * as jwt from "jsonwebtoken";
import * as adminService from "../services/admin.service";
import { RowDataPacket } from "mysql2";

export const signUp = async (
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    gender: string,
    phone: string
) => {
    const [result] = await userService.findOneByEmail(email);
    if (result.length === 0) {
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password, salt);

        return userService.create(
            lastName,
            firstName,
            email,
            hashPassword,
            gender,
            phone
        );
    } else {
        return {
            message: "Email exists already!",
            status: 409,
        };
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        let findUser = await userService.findOneByEmail(email);
        let [rows] = findUser;
        console.log([rows]);
        if (rows.length === 0) {
            return {
                status: 404,
                message: "User not found",
            };
        } else {
            if (rows[0].isLogin === 1 && process.env.TOKEN_SECRET) {
                let hashPassword = rows[0].password;
                let compare = bcrypt.compareSync(password, hashPassword);
                if (!compare) {
                    return {
                        status: 401,
                        message: "Incorrect password",
                    };
                } else {
                    let access_token = jwt.sign(
                        {
                            data: {
                                id: rows[0].userId,
                                email: rows[0].email,
                                firstName: rows[0].firstName,
                                lastName: rows[0].lastName,
                            },
                        },
                        process.env.TOKEN_SECRET,
                        { expiresIn: 12000 }
                    );
                    return {
                        status: 200,
                        message: "Sign in successful",
                        access_token,
                    };
                }
            } else {
                return {
                    status: 201,
                    message: "Sign in is denied",
                };
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
        };
    }
};


export const signInAdmin = async (email: string, password: string) => {
    try {
        let findUser = await adminService.findOneByEmail(email);
        const rows: any = findUser[0];
        if (!findUser[0]) {
            return {
                status: 404,
                message: "Admin not found",
            };
        } else if (process.env.TOKEN_SECRET) {
            let hashPassword = rows[0].password;
            let compare = bcrypt.compareSync(password, hashPassword);

            if (!compare) {
                return {
                    status: 401,
                    message: "Incorrect password",
                };
            } else {
                let access_token = jwt.sign(
                    {
                        data: {
                            email: rows[0].email,
                            name: rows[0].name,
                        },
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: 12000 }
                );
                return {
                    status: 200,
                    message: "Sign in successful",
                    access_token,
                };
            }
        }
        return {
            message: "failed"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
        };
    }
};
