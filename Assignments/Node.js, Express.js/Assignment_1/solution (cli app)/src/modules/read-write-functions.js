const fs = require("node:fs/promises");


async function readProducts() {
    try {
        const data = await fs.readFile("./products.json", "utf-8");
        if (!data) {       // first add (no products yet)
            return [];
        }
        return JSON.parse(data);
    } catch (err) {
        console.log("Error reading products: ", err);
        return [];
    }
}

async function writeProducts(newProductsData) {
    try {
        await fs.writeFile("./products.json", JSON.stringify(newProductsData, null, 2));
    } catch (err) {
        console.log("Error adding products: ", err);
    }
}




module.exports = {readProducts, writeProducts};