// get 3 numbers (x,y,z) from the user
// ensure they are numbers
// if:      x % y == 0 && x % z == 0  => print "x is divisible by both y and z"
// else if: x % y == 0 && x % z != 0  => print "x is divisible by only y"
// else if: x % y != 0 && x % z == 0  => print "x is divisible by only z"
// else:    => print "x is divisible by neither y nor z" 



function checkDivisibility() {
    // get 3 valid numbers (x,y,z) from the user
    const x = getValidNumber(1), y = getValidNumber(2), z = getValidNumber(3);

    if (y == 0 || z == 0) {
        console.log("Please enter a valid number for y and z.");
        return;
    }

    if (x % y == 0 && x % z == 0) {
        console.log("x is divisible by both y and z");
    } else if (x % y == 0 && x % z != 0) {
        console.log("x is divisible by only y");
    } else if (x % y != 0 && x % z == 0) {
        console.log("x is divisible by only z");
    } else {
        console.log("%cx is divisible by neither y nor z", "color: red; font-weight: bold;");
    }
}
checkDivisibility();


// get valid number from the user
function getValidNumber(numOrder) {
    let isValidNum = false;
    let numValue;

    do {
        const value = prompt("Enter number " + numOrder + ": ");
        
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