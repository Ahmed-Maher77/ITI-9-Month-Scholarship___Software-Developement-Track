const registerBtn = document.getElementById("register");
registerBtn.addEventListener("click", register);

function register() {
    // collect the data from the form
    const username = document.getElementById("username").value;
    const age = document.getElementById("age").value;

    let gender = "";
    const genderInputs = document.querySelectorAll("input[name='gender']");
    for (const i in genderInputs) {
        if (genderInputs[i].checked) {
            gender = genderInputs[i].value;
        }
    }
    const favColor = document.getElementById("favColor").value;

    // check data validity
    if (!username || !age || !gender || !favColor) {
        alert("Please fill all the required fields!");
        return;
    }

    // Get existing visitCount from cookies using cookieLib
    const visitCountCookie = getCookie("visitCount");
    const oldVisitCount = parseInt(visitCountCookie["visitCount"] || "0") || 0;
    const newVisitCount = oldVisitCount + 1;

    // store them + visitCount in the cookies using cookieLib
    setCookie("username", username);
    setCookie("age", age);
    setCookie("gender", gender);
    setCookie("favColor", favColor);
    setCookie("visitCount", String(newVisitCount));

    // go to profile page => show welcoming message
    goToProfile();
}
