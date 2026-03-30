import readProductsFile from "../../utils/readProductsFile.js";
import writeProductsFile from "../../utils/writeProductsFile.js";

const deleteProduct = async (id, res) => {
    // read all products
    const data = await readProductsFile();
    // get product index by id
    const productIndex = data.findIndex((p) => p.id === id);
    
    // ensure product exists
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // remove product from products array
    data.splice(productIndex, 1);
    // or: data = data.filter(p => p.id !== id);

    // write updated products array to products file
    await writeProductsFile(data);
};

export default deleteProduct;
