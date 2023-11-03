import connection from "../config/database.config";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
interface CartItem {
    productId: string;
    userId: string;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}

export const addOrder = (userId: string, totalAmount: number, shippingAddress: string) => {
    return connection.execute(
        "INSERT INTO `project`.`order`(userId, totalAmount, shippingAddress) VALUES(?, ?, ?)",
        [userId, totalAmount, shippingAddress]
    );
};

export const addOrderDetail = (orderDetailValues: CartItem[]) => {
    const placeholders = orderDetailValues
        .map(() => "(?, ?, ?, ?, ?,?)")
        .join(",");
    const values = orderDetailValues
        .flat()
        .map((value) => (value !== undefined ? value : null));
    console.log(values);
    const sql = `INSERT INTO orderdetail(orderId,
      productId,
      productName,
      price,
      image,
      quantity) VALUES ${placeholders}`;

    return connection.execute(sql, values);
};

export const findAllOrders = () => {
    return connection.execute(
        "SELECT o.*, u.firstName,u.lastName FROM `project`.`order` o INNER JOIN users u ON o.userId = u.userId  order by status asc, orderDate desc"
    );
};

export const findAllOrdersByUserId = (id: number) => {
    return connection.execute(
        "SELECT * FROM `project`.`order` WHERE userId = ? order by status asc, orderDate desc",
        [id]
    );
};

export const findOneOrderDetail = (id: number) => {
    return connection.execute(
        "SELECT o.*, od.*, u.userId,u.lastName, u.firstName FROM `project`.`order` o INNER JOIN orderdetail od ON o.orderId = od.orderId INNER JOIN users u ON o.userId = u.userId WHERE o.orderId = ?",
        [id]
    );
};

export const updateStatus = (value: number, id: number) => {
    return connection.execute("UPDATE `project`.`order` SET status = ? WHERE orderId = ?", [
        value,
        id,
    ]);
};
