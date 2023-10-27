import * as mysql from "mysql2";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

const connection: Pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "project",
    password: "12345678",
    port: 3306
});

export default connection.promise();
