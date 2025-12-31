// get range (start, end) from user
// sum = 0, threeMultiples = "Number multiples of 3: ", fiveMultiples = "Number multiples of 5: "
// loop over the elements within the range
    // Number multiple of 3 => add to threeMultiples string then ","
    // Number multiple of 5 => add to fiveMultiples string then ","
        // if any of them true => update sum => sum += num
// print threeMultiples string in console
// print fiveMultiples string in console
// print sum in console




function sumOfMultiples() {
    const start = getValidNumber("start");
    const end = getValidNumber("end");
    if (start > end) {
        let temp = x;
        x = y;
        y = temp;
    }

    let sum = 0;
    let threeMultiples = "Number multiples of 3: ";
    let fiveMultiples = "Number multiples of 5: ";

    for (let i = start; i <= end; i++) {
        if (i % 3 == 0) {
            threeMultiples += i + ", ";
            sum += i;
        } 
        if (i % 5 == 0) {
            fiveMultiples += i + ", ";
            sum += i;
        }
    }

    console.log(threeMultiples);
    console.log(fiveMultiples);
    console.log("Sum: " + sum);
};
sumOfMultiples();



// get valid number from the user
function getValidNumber(numOrder) {
    let isValidNum = false;
    let numValue;

    do {
        const value = prompt("Enter range " + numOrder + ": ");
        
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