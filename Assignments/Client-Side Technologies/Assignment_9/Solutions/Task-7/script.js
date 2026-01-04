window.onload = function() {
    // Selectors
    const pageCountBtns = document.getElementsByClassName("page-count");
    const inputField = document.querySelector("[name='currentPage']");
    const clearBtn = document.getElementById("clear");
    const eraseBtn = document.getElementById("eraseBtn");


    // Add Page Count
    for (let i = 0; i < pageCountBtns.length; i++) {
        pageCountBtns[i].addEventListener("click", displayVal);
    }

    // Reset Page Count
    clearBtn.addEventListener("click", clear);

    // Remove Last Page Count
    eraseBtn.onclick = eraserFun;
    

    // ============ Functions ============
    function displayVal() {
        const handlerVal = event.target.innerText;
        inputField.value += handlerVal;
    }

    function eraserFun() {
        const newValue = inputField.value.slice(0, -1);
        inputField.value = newValue;
    }

    function clear() {
        inputField.value = "";
    }
}

