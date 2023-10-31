import connection from "../config/database.config";

export const findAll = () => {
    return connection.execute(
        "SELECT pro.productId, pro.name, pro.size, pro.price, re.refreshrateValue, ma.name AS manufacturerName, reso.resolutionValue, pic.source FROM product pro INNER JOIN refreshrate re ON pro.refreshrateId = re.refreshrateId INNER JOIN manufacturer ma ON pro.manufacturerId = ma.manufacturerId INNER JOIN resolution reso ON reso.resolutionId = pro.resolutionId INNER JOIN picture pic ON pro.productId=pic.productId WHERE pic.type=1"
    );
};

export const findOne = (id: number) => {
    return connection.execute("SELECT pro.*, re.refreshrateValue, ma.name AS manufacturerName, reso.resolutionValue FROM product pro INNER JOIN refreshrate re ON pro.refreshrateId = re.refreshrateId INNER JOIN manufacturer ma ON pro.manufacturerId = ma.manufacturerId INNER JOIN resolution reso ON reso.resolutionId = pro.resolutionId WHERE productId=?", [id])
};
