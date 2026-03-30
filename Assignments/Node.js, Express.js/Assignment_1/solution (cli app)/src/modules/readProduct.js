const { readProducts } = require("./read-write-functions");

// Read
async function readAllProducts() {
    const data = await readProducts();
    // if no products found
    if (data.length === 0) {
        console.log("No products found");
        return;
    }
    console.log("Products: ", data);
}

async function readProductById(productId) {
    // if no id provided
    if (!productId) {
        console.log("Please provide a product id");
        return;
    }
    const data = await readProducts();
    
    // if no products 
    if (data.length === 0) {
        console.log("No products found");
        return;
    }

    // find product by id
    const productIndex = data.findIndex(p => p.id === productId);
    
    // no product with this id
    if (productIndex === -1) {
        console.log("Product not found");
        return;
    }
    console.log("Fetched Product: ", data[productIndex]);
}


module.exports = { readAllProducts, readProductById };