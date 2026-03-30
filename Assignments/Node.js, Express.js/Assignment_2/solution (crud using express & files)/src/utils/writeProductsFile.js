import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';


// get the path of products.json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.resolve(__dirname, "../../products.json");



async function writeProductsFile(products) {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
}


export default writeProductsFile;