// ================ Get Cookies ================
function getCookie(cookieName) {
    // check number of parameters
    if (arguments.length !== 1)
        throw new Error("Invalid number of arguments");

    // check type
    if (typeof cookieName !== "string")
        throw new TypeError("cookieName must be a string");
    
    const cookies = document.cookie.split("; ");
    let cookieResult = {};

    for (const i in cookies) {
        const key = cookies[i].split("=")[0];
        if (key === cookieName) {
            const value = cookies[i].split("=")[1];
            cookieResult[key] = decodeURIComponent(value);
        }
    }

    return cookieResult;
}


// ================ Set Cookies ================
function setCookie(cookieName, cookieValue, expiryDate = "") {
    // check number of parameters
    if (arguments.length !== 2 && arguments.length !== 3)
        throw new Error("Invalid number of arguments");
    // check data types of parameters
    if (typeof arguments[0] !== "string" || typeof arguments[1] !== "string")
        throw new Error("Invalid type! must be string");
    if (typeof arguments[2] !== "object")
        throw new Error("expiryDate must be a Date object");

    document.cookie =
        cookieName + "=" + cookieValue + "; expires=" + expiryDate;
}


function deleteCookie(cookieName) {
    // check number of parameters
    if (arguments.length != 1)
        throw new Error("Invalid number of arguments");
    // check type of parameters
    if (typeof arguments[0] != "string")
        throw new Error("cookieName must be a string");

    const currentMonth = (new Date()).getMonth();
    const pastDate = (new Date).setMonth(currentMonth - 1);
    document.cookie = cookieName + "=; expires=" + pastDate;
}


function allCookieList() {
    // get the all cookies
    // convert them into an array => split("; ")
    // loop through the array => append the key-value as an object in a nnw array

    const cookies = document.cookie.split("; ");
    const cookieList = [];

    for (const i in cookies) {
        const key = cookies[i].split("=")[0];
        const value = cookies[i].split("=")[1];
        const obj = { key, value: decodeURIComponent(value) };
        cookieList.push(obj);
    }

    return cookieList;
}


function hasCookie(cookieName) {
    // check number of parameters
    if (arguments.length != 1)
        throw new Error("Invalid number of arguments");
    // check type of parameters
    if (typeof arguments[0] != "string")
        throw new Error("cookieName must be a string");

    const cookies = document.cookie.split("; ");
    const foundCookie = {};
    
    for (const i in cookies) {
        const key = cookies[i].split("=")[0];
        const value = cookies[i].split("=")[1];
        if (key === cookieName && value) {
            foundCookie[key] = decodeURIComponent(value);
        }
    }

    return foundCookie != {}? foundCookie : false;
}