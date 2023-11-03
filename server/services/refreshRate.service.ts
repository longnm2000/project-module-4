import connection from "../config/database.config";
export const findAllRefreshRates = () => {
    return connection.execute("SELECT * FROM refreshrate;");
};

