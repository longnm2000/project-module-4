import connection from "../config/database.config";
export const findOneByEmail = (email: string) => {
    return connection.execute("SELECT * FROM admin WHERE email = ?", [email]);
};

