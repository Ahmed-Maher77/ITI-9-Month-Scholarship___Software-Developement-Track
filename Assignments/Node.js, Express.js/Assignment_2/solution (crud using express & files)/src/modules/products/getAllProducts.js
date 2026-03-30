import readProductsFile from "../../utils/readProductsFile.js";


async function getAllProducts() {
    return await readProductsFile();
}




export default getAllProducts;