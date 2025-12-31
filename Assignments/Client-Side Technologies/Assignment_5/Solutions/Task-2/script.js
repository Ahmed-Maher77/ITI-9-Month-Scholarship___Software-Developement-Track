// sum = 0
// loop unknown times, at least 1 time => do-while (sum <= 100)
    // take values from the user
    // ensure value is numeric starting from 0
        // T => sum += value
        // F => show msg in console then continue
// print sum in console



// prints the sum of all numbers entered by the user until the total sum is greater than 100
function printSum() {
    let sum = 0;

    do {
        const value = prompt("Enter a number:");
        const valueNum = Number(value);

        let isValidNum = isValidNumber(value, valueNum);
        
        // check if value is zero
        if (valueNum == 0) {
            console.log("you entered 0, Goodbye!");
            break;
        } 
        // valid number
        else if (isValidNum) {
            sum += valueNum;
        }
    } while (sum <= 100);
    
    console.log("total sum of the entered values is: " + sum);
};
printSum();


// check if value is numeric and positive
function isValidNumber(originalValue, num) {
    if (isNaN(num) || num < 0) {
        console.log("Inavlid number:" + originalValue + ". Please enter a valid number.");
        return false;
    }
    return true;
}