const { readProducts, writeProducts } = require("./read-write-functions");


async function addProduct(productName) {
    // if no name provided
    if (!productName) {
        console.log("Please provide a product name");
        return;
    }
    
    // create product object
    const product = {
        id: `${new Date().getTime()} - ${Math.random()}`,
        title: productName
    }
    
    // write to file
    const productsData = await readProducts();
    productsData.push(product);
    await writeProducts(productsData);
}

module.exports = addProduct;