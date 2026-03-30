import { v4 as uuid } from "uuid";
import readProductsFile from "../../utils/readProductsFile.js";
import writeProductsFile from "../../utils/writeProductsFile.js";

async function addNewProduct(name, price) {
    // create product object
    const newProduct = {
        id: uuid(),
        name,
        price
    };
    
    // read products file
    const products = await readProductsFile();

    // push new product to products array
    products.push(newProduct);
    // or: products = [...products, newProduct];

    // write updated products array to products file
    await writeProductsFile(products);

    // return new product
    return newProduct;
}


export default addNewProduct;