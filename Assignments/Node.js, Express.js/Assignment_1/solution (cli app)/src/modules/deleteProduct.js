const { readProducts, writeProducts } = require("./read-write-functions");


// Delete
async function deleteProduct(productId) {
    // if no id provided
    if (!productId) {
        console.log("Please provide the product id!");
        return;
    }

    // read products
    const productsData = await readProducts();
    // find product by id
    const productIndex = productsData.findIndex(p => p.id === productId);    

    // if product not found
    if (productIndex === -1) {
        console.log("Product not found");
        return;
    } else {
        // delete product
        productsData.splice(productIndex, 1);
    }

    // Another way:
    // const filteredProducts = productsData.filter(p => p.id !== productId);

    // write updated products to file
    await writeProducts(productsData);
}

async function resetProducts() {
    await writeProducts([]);
}



module.exports = { deleteProduct, resetProducts };