import readProductsFile from "../../utils/readProductsFile.js";
import writeProductsFile from "../../utils/writeProductsFile.js";


async function updateProduct(id, data, res) {
    // get all products
    const products = await readProductsFile();
    // get product index by id
    const productIndex = products.findIndex((p) => p.id == id);
    
    // ensure product exists
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    // update product
    for (const key in data) {
        const value = data[key];
        if (value) {
            products[productIndex][key] = value;
        }
    }
    
    // write updated products array to products file
    await writeProductsFile(products);

    // return updated product
    return products[productIndex];
}


export default updateProduct;