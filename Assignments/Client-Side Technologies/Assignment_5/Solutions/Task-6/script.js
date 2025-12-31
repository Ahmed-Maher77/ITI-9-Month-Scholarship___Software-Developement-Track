// get number of rows from the user
// ensure number is valid
// loop [no. of the rows] times
    // stars = ""
    // inner loop => i times
        // add to stars string => "*"
    // print stars string in console



function printStars() {
    const rows = getValidNumber();

    for (let i = 0; i < rows; i++) {
        let stars = "";
        for (let j = 0; j < i+1; j++) {
            stars += "*";
        }
        console.log("%c" + stars, "color: blue; font-size: 1.2rem; font-weight: bold;");
    }
}
printStars();



// get valid number from the user
function getValidNumber() {
    let isValidNum = false;
    let numValue;

    do {
        const value = prompt("Enter number of rows: ");
        
        // check if the value exists
        if (value == null || value == "") {
            console.log("Please enter a valid number.");
            continue;
        }
        
        numValue = Number(value);
        if (!isNaN(numValue)) {
            isValidNum = true;
        } else {
            console.log("Inavlid number:" + value + ". Please enter a valid number.");
        }
    } while (!isValidNum);
    
    return numValue;
}