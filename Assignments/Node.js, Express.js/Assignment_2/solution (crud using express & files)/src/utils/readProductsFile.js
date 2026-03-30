import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


// get the path of products.json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.resolve(__dirname, "../../products.json");



const readFile = async () => {
    const data = await fs.readFile(productsFilePath, "utf-8");
    return JSON.parse(data);
};

export default readFile;
