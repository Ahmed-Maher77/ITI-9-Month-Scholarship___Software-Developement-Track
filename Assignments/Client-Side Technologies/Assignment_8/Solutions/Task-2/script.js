// create a form => name, title, address, gender, email, mobile
// get the data from the queryParams
// greeting message: Hello, {title}. {name} + welcome to our website
// show: address, gender, email, mobile
// check the vendor name, if it is not chrome => recommend chrome

// =============== Select Elements ===============
let main;
let tableContainer;

// =============== Main Program ===============
const userData = {};
window.onload = function () {
    main = document.querySelector("main");
    tableContainer = document.getElementById("table-container");
    getUserData();
    showGreeting();
    showGenderImage();
    showUserData();
};

// =============== Functions ===============
// get the data from the queryParams
function getUserData() {
    const queryParams = location.search;
    if (queryParams) {
        const paramsArr = queryParams.substring(1).split("&");
        for (const i in paramsArr) {
            const field = paramsArr[i].split("=");
            if (field[0] && field[1]) {
                userData[field[0]] = decodeURIComponent(field[1]);
            }
        }
    }
}

// show a greeting message
function showGreeting() {
    const greetingTag =
        "<h2>Hello, " +
        "<span class='title'>" +
        userData.title +
        "</span>" +
        ". " +
        "<span class='name'>" +
        userData.username.replace("+", " ") +
        "</span>" +
        "<br/><span class='small'>welcome to our website</span></h2>";
    main.insertAdjacentHTML("afterbegin", greetingTag);
}

// show image representing the gender
function showGenderImage() {
    const imgElement = document.getElementById("owner-img");
    if (imgElement) {
        const userGender = userData.gender;
        let imgSrc;
        if (userGender === "other") {
            imgSrc = "./images/other.jpg";
        } else if (userGender === "default" || !userGender) {
            imgSrc = "./images/female.png";
        } else {
            imgSrc = "./images/" + userGender + ".png";
        }
        imgElement.src = imgSrc;
    }
}

// show (address, gender, email, mobile) in a table
function showUserData() {
    const fieldsToShow = ["address", "gender", "email", "mobile"];
    let tableTag = "<table>";

    for (const i in fieldsToShow) {
        const fieldName = fieldsToShow[i];
        if (userData[fieldName]) {
            const firstLetter = fieldName[0].toUpperCase() + fieldName.slice(1);
            const tr =
                "<tr><td class='table-head'>" +
                firstLetter +
                "</td><td>" +
                userData[fieldName] +
                "</td></tr>";
            tableTag += tr;
        }
    }
    tableTag += "</table>";

    tableContainer.innerHTML = tableTag;
}