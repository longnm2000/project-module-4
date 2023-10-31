import connection from "../config/database.config";
export const findOneByEmail = (email: string) => {
    return connection.execute("SELECT * FROM admins WHERE email = ?", [email]);
};

export const create = (email: string, password: string) => {
    return connection.execute("INSERT INTO admins(email, password) VALUES(?, ?)", [
        email,
        password,
    ]);
};