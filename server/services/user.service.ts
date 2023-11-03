
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import connection from "../config/database.config";

type User = {
    userId?: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    birthDate: string;
    gender: string;
    phone: string;
};

type UpdateUser = {
    userId: number;
    isLogin: boolean;
};

export const findAll = () => {
    return connection.query<RowDataPacket[]>("SELECT * FROM users ORDER BY userId DESC");
};

export const findOne = (id: number) => {
    return connection.query<RowDataPacket[]>("SELECT * FROM users WHERE userId = ?", [id]);
};

export const findOneByEmail = (email: string) => {
    return connection.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
};

export const create = (
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    gender: string,
    phone: string) => {


    return connection.query<ResultSetHeader>(
        "INSERT INTO users(lastName, firstName, email, password, gender, phone) VALUES(?,?,?,?,?,?)",
        [lastName, firstName, email, password, gender, phone]
    );
};

export const update = (userId: any, isLogin: any) => {
    console.log(userId, isLogin);
    return connection.query<ResultSetHeader>(
        "UPDATE `project`.`users` SET `isLogin` = ? WHERE (`userId` = ?)",
        [isLogin, userId]
    );
};
