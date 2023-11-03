import connection from "../config/database.config";

export const findAllById = (id: string) => {
    return connection.execute("SELECT * FROM picture WHERE productId=?", [id]);
}

export const addAvatar = (productId: any, avatar: any) => {
    console.log("a");

    return connection.execute("INSERT INTO picture(productId,source,type) VALUES(?,?,?)", [
        productId,
        avatar,
        1,
    ]);
};

export const addOptionalImages = (productId: any, optionalImages: any) => {
    console.log("b");

    const placeholders = optionalImages.map(() => "(?, ?)").join(",");
    const transformedArray = optionalImages.reduce((result: any, current: any) => {
        result.push(+productId, current);
        return result;
    }, []);
    return connection.execute(
        `INSERT INTO picture(productId,source) VALUES ${placeholders}`,
        transformedArray
    );
};