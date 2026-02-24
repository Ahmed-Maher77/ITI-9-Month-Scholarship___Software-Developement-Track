import { proxyObj } from "./proxyObj.js";

// Example of setting valid properties
try {
    proxyObj.name = "JohnDoe"; 
    proxyObj.address = "123 Main St";
    proxyObj.age = 30;               

    console.log(proxyObj);
} catch (error) {
    console.error(error.message);
}

// Example of setting invalid properties
try {
    proxyObj.name = "John";
} catch (error) {
    console.error(error.message);
}
