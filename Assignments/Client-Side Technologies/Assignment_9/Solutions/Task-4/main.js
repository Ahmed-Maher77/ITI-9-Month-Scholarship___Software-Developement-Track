const keyboardKey = document.getElementById("keyboard-key");
const pressedKeysResult = document.getElementById("pressedKeys-result");

keyboardKey.addEventListener("keydown", showPressedKeys);
// keyboardKey.addEventListener("keypress", showPressedKeys)

function showPressedKeys() {
    pressedKeysResult.innerText = "You Pressed: " + event.key;
}
