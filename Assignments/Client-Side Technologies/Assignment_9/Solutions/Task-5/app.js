window.addEventListener("keydown", function () {
    const charCode = event.keyCode;
    const char = event.key;
    console.log(
        "Physical Key: %c" + charCode + "%c | Logical Key: %c" + char,
        "color: red; font-weight: bold",
        "color: #000",
        "color: green; font-weight: bold"
);


    // ============= Bonus =============
    // disable (ctrl + s)
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        console.log("Ctrl + S is disabled!");
    }
    // disable (ctrl + p)
    if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        console.log("Ctrl + P is disabled!");
    }
    // disable (ctrl + e)
    if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        console.log("Ctrl + e is disabled!");
    }
});
