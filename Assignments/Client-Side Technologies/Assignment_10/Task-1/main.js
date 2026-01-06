// ================ Selectors ================
const setcookiesForm = document.getElementById("setcookiesForm");
const getcookiesForm = document.getElementById("getcookiesForm");
const checkCookieForm = document.getElementById("checkCookieForm");

const getCookieBtn = document.getElementById("get-cookie");
const deleteCookieBtn = document.getElementById("delete-cookie");
const getAllCookiesBtn = document.getElementById("get-all-cookies");



// ================ Main Program ================
setcookiesForm.onsubmit = handleSetCookie;
getCookieBtn.addEventListener("click", handleGetCookie);
deleteCookieBtn.addEventListener("click", handleDeleteCookie);
getAllCookiesBtn.addEventListener("click", handleAllCookies);

// ================ Functions ================
function handleSetCookie() {
    event.preventDefault();
    const cookieName = setcookiesForm.cookieName.value.trim();
    const cookieValue = setcookiesForm.cookieValue.value.trim();
    const cookieExpiry = setcookiesForm.cookieExpiry.value.trim();

    const expiry = new Date(cookieExpiry);
    setCookie(cookieName, cookieValue, expiry);
}

function handleGetCookie() {
    event.preventDefault();
    const cookieName = getcookiesForm.cookieName.value;
    const cookie = getCookie(cookieName);
    // console.log("cookie is: %c" + key + "%c, value is: %c" + value, "color: blue; font-weight: bold;", "color: black; font-weight: normal;", "color: green; font-weight: bold;");
    console.log("cookie is:", cookie);
}

function handleDeleteCookie() {
    // prevent default
    // get the cookieName value from the form
    // call deleteCookie function

    event.preventDefault();
    const cookieName = getcookiesForm.cookieName.value.trim();
    deleteCookie(cookieName);
}

function handleAllCookies() {
    const cookies = allCookieList();
    console.log("all cookies are:", cookies);
}