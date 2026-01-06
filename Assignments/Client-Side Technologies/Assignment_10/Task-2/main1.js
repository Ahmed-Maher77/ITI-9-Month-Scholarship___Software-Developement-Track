let isRegistered = checkRgister();

// Get current page filename
const currentPage = location.pathname.split("/").pop() || "index.html";

if (isRegistered && currentPage === "index.html") {
    goToProfile();
} else if (!isRegistered && currentPage === "profile.html") {
    goToHome();
}

// ============ Functions ============
function checkRgister() {
    // get the required data [username, favColor, visitCount, gender] from the cookies using cookieLib
    const requiredFields = ["username", "favColor", "visitCount", "gender"];
    for (const i in requiredFields) {
        const cookieName = requiredFields[i];
        const cookieResult = getCookie(cookieName);
        // getCookie returns an object like {cookieName: "value"} or {} if not found
        if (!cookieResult[cookieName]) {
            return false;
        }
    }
    return true;
}

function goToProfile() {
    location.assign("./profile.html");
}

function goToHome() {
    location.assign("./index.html");
}
