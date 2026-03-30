import readProductsFile from "../../utils/readProductsFile.js";

async function getProductById(id) {
    const products = await readProductsFile();
    const product = products.find((p) => p.id == id);
    return product;
}



export default getProductById;