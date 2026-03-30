const { readProducts, writeProducts } = require("./read-write-functions");

// Update
async function updateProduct(productId, newName) {
    // if no id or name provided
    if (!productId || !newName) {
        console.log("Please provide a product id and a new name");
        return;
    }

    // read products
    const productsData = await readProducts();
    // find product by id
    const productIndex = productsData.findIndex(p => p.id === productId);
    
    // if product not found
    if (productIndex === -1) {
        console.log("Product not found");
    } else {
        // update product title
        productsData[productIndex].title = newName;
    }

    // write updated products to file
    await writeProducts(productsData);
}

module.exports = updateProduct;