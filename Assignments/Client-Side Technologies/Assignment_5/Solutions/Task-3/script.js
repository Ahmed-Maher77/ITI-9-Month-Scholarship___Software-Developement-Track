// get 2 numbers from the user
// ensure numbers are valid
// get the max value using the ternary operator
// print the max value in the console





function getMax() {
    // get 2 valid numbers from the user
    const num1 = getValidNumber("first");
    const num2 = getValidNumber("second");
    
    // get the max value using the ternary operator
    const max = num1 >= num2? num1 : num2;

    // print the max value in the console
    console.log("The max value is: " + max);
};
getMax();


// ensure number is valid
function getValidNumber(numberCount) {
    let isValid = false;
    let num;
    do {
        num = Number(prompt("Enter the " + numberCount + " number: "));
        
        // check if the value exists
        if (num == null || num == "") {
            console.log("Please enter a valid number.");
            continue;
        }
        
        if (!isNaN(num)) {
            isValid = true;
        }
    } while(!isValid);

    return num;
}