import connection from "../config/database.config";
export const findAllResolutions = () => {
    return connection.execute("SELECT * FROM resolution;");
};