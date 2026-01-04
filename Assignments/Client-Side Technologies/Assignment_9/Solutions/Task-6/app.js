const answerField = document.getElementById("Answer");
let enteredNumbersAndOperators = [];
const operators = ["+", "-", "*", "/"];



function EnterEqual() {
    if (enteredNumbersAndOperators.length < 3) {
        console.log("Not enough operands");
        return;
    }

    if (operators.includes(enteredNumbersAndOperators.at(-1))) {
        console.log("Expression cannot end with an operator");
        return;
    }

    // PASS 1 => handle * and /
    let stack = [];

    for (let i = 0; i < enteredNumbersAndOperators.length; i++) {
        const token = enteredNumbersAndOperators[i];

        if (token === "*" || token === "/") {
            const prev = Number(stack.pop());
            const next = Number(enteredNumbersAndOperators[++i]);

            // check for division by zero
            if (token === "/") {
                if (next === 0) {
                    answerField.value = "Error: Division by zero";
                    enteredNumbersAndOperators = [];
                    return;
                }
                stack.push(prev / next);
            } else {
                stack.push(prev * next);
            }
        } else {
            stack.push(token);
        }
    }

    // PASS 2 => handle + and -
    let result = Number(stack[0]);

    for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i];
        const nextNumber = Number(stack[i + 1]);

        if (operator === "+") result += nextNumber;
        else result -= nextNumber;
    }

    answerField.value = result;
    enteredNumbersAndOperators = [result]; // allow chaining
}




function EnterNumber(val) {
    if (isNaN(Number(val)) && val !== ".") return;

    const last = enteredNumbersAndOperators.at(-1);

    if (last === undefined) {
        enteredNumbersAndOperators.push(val === "." ? "0." : val);
    } else if (!isNaN(Number(last)) || last === ".") {
        if (val === "." && String(last).includes(".")) return; // prevent multiple decimals
        // replace last number
        enteredNumbersAndOperators[enteredNumbersAndOperators.length - 1] =
            String(last) + val;
    } else {
        enteredNumbersAndOperators.push(val);
    }
    displayOnScreen();
}



function EnterOperator(val) {
    const last = enteredNumbersAndOperators.at(-1);
    console.log(last);

    if (enteredNumbersAndOperators.length == 0) {
        console.log("Cannot start with an operator");
        return;
    }

    if (operators.includes(last)) {
        console.log("Cannot enter two operators in a row");
        return;
    }

    enteredNumbersAndOperators.push(val);
    console.log(enteredNumbersAndOperators);
    displayOnScreen();
}



function EnterClear() {
    enteredNumbersAndOperators = [];
    answerField.value = "";
}

function displayOnScreen() {
    answerField.value = enteredNumbersAndOperators.join("");
}
