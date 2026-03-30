// importing functions
const addProduct = require("./src/modules/addProduct");
const {
    readAllProducts,
    readProductById,
} = require("./src/modules/readProduct");
const updateProduct = require("./src/modules/updateProduct");
const checkTerminalFlags = require("./src/modules/flagsHandler");
const { deleteProduct, resetProducts } = require("./src/modules/deleteProduct");
const { readFileSync } = require("node:fs");

const [, , ...args] = process.argv;

console.log(process.versions);

// CRUD
async function main() {
    switch (args[0]) {
        // add product: node index add name
        case "add":
            await addProduct(args[1]);
            break;
        // read products: node index readAll
        case "readAll":
            await readAllProducts();
            break;
        // read a product: node index read id
        case "read":
            await readProductById(args[1]);
            break;
        // update product: node index update id name
        case "update":
            await updateProduct(args[1], args[2]);
            break;
        // delete product: node index delete id
        case "delete":
            await deleteProduct(args[1]);
            break;
        // delete all products: node index reset
        case "reset":
            await resetProducts();
            break;
        default:
            // node index --name productName
            checkTerminalFlags(args);
    }
}
main();
