import connection from "../config/database.config";
export const findAllManufacturers = () => {
    return connection.execute("SELECT * FROM manufacturer;");
};

export const deleteManufacturer = (id: number) => {
    return connection.execute("DELETE FROM manufacturer WHERE manufacturerId = ?", [id]);
};

export const addManufacturer = (name: string) => {
    return connection.execute("INSERT INTO manufacturer(name) VALUES(?)", [name]);
};

export const updateManufacturer = (id: number, name: string) => {
    connection.execute("UPDATE manufacturer SET name = ? WHERE manufacturerId = ?", [
        name,
        id,
    ]);
};

export const findOneManufacturer = (id: number) => {
    return connection.execute(
        "SELECT * FROM manufacturer WHERE manufacturerId = ?;",
        [id]
    );
};