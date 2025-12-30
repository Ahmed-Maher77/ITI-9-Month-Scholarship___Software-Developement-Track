// Task 2 - Part 1
function showAddr(addressInfo) {
    const today = new Date();
    const registerData = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    
    let addressBody = addressInfo.buildingNum + " " + addressInfo.street + ", " + addressInfo.city + "city, registered in " + registerData;
    console.log("the address is: ", addressBody);
}


// refrence: { street: "abc st.", buildingNum: 15, city: "xyz" }
function createAddressObject() {
    const street = getValidString("Enter the street name: ");
    const buildingNum = getValidNumber("Enter the building number: ");
    const city = getValidString("Enter the city name: ");

    const addressObject = { street, buildingNum, city };
    console.log("the entered address is: ", addressObject);

    return addressObject;
}
showAddr(createAddressObject());


// ===============================================


// Task 2 - Part 2
function dispVal(obj, key) {
    // check the length of the object
    if (Object.keys(obj).length == 2) {
        // find the value of the given key
        let value = obj[key];
        if (value) {
            console.log("the given key is: %c" + key + ", and the value is: %c" + value, "font-weight: bold; font-size: 1.3rem", "color: green; font-size: 1.3rem");
        } else {   // if the key doesn't exist
            console.log("key doesn't exist");
        }
    } else {
        console.log("object length doesn't fit the requirements != 2");
    }
}


// refrence: { street: "abc st.", buildingNum: 15, city: "xyz" }
function createTwoPropertiesObject() {
    const propOne = getValidString("Enter the first property key: ");
    const propOneKey = getValidString("Enter the first property value: ");
    const propTwo = getValidString("Enter the second property key: ");
    const propTwoKey = getValidString("Enter the second property value: ");
    
    const object = {};
    object[propOne] = propOneKey;
    object[propTwo] = propTwoKey;
    console.log("the entered object is: ", object);
    return object;
}

const obj = createTwoPropertiesObject();
const key = getValidString("Enter the key: ");
dispVal(obj, key);














// how sort works




function getValidNumber(type) {
    let valueNumber;
    let isValid = false;
    do {
        let value = prompt(type);
        valueNumber = Number(value);
        if (value.trim() !== "" && !isNaN(valueNumber)) {
            isValid = true;
        }
    } while (!isValid);
    return valueNumber;
}

function getValidString(type) {
    let value;
    let isValid = false;
    do {
        value = prompt(type);
        if (value.trim() !== "") {
            isValid = true;
        }
    } while (!isValid);
    return value;
}
