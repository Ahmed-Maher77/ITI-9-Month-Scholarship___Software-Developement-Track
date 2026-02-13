const colorGround = document.getElementById("color-ground");
const colorInputs = document.querySelectorAll(".control-btns input");
colors = { red: 0, green: 0, blue: 0 };

for (const colorInput of colorInputs) {
    colorInput.addEventListener("input", updateColor);
}

function updateColor(e) {
    const colorType = e.target.name.split("-")[0];
    colors[colorType] = e.target.value;
    updateColorGround();
}

function updateColorGround() {
    colorGround.style.color =
        "rgb(" + colors.red + "," + colors.green + "," + colors.blue + ")";
}
