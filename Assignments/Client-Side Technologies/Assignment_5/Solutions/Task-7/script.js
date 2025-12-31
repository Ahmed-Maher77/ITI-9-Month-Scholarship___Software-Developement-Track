// enter 2 numbers (x,y) AND string (z) from the user
// ensure they are valid numbers
// if:      z == "odd" => print all odd numbers between x and y
// else if: z == "even"
// else if: x % y != 0 && x % z == 0  => print "x is divisible by only z"
// else:    => print "x is divisible by neither y nor z"



function getNumbers() {
    let x = getValidNumber(" x");
    let y = getValidNumber(" y");
    if (x > y) {
        let temp = x;
        x = y;
        y = temp;
    }

    const z = getValidZ();
    // let incrementValue = 1;
    let numbers = "", sum = 0;

    // switch(z) {
    //     case "odd":
    //         if (x % 2 == 0) 
    //             incrementValue = 1;
    //         else
    //             incrementValue = 2;
    //         break;
    //     case "even":
    //         if (x % 2 == 0) 
    //             incrementValue = 2;
    //         else
    //             incrementValue = 1;
    //         break;
    //     default:
    //         incrementValue = 1;
    //         break;
    // }
    

    // for (let i = x; i <= y; i = i + incrementValue) {
    //     numbers += i + ", ";
    //     sum += i;
    // }
    for (let i = x; i <= y; i++) {
        if (z == "odd" && i % 2 != 0 || z == "even" && i % 2 == 0 || z == "no") {
            numbers += i + ", ";
            sum += i;
        }
    }
    console.log("numbers in range: " + numbers);
    console.log("Sum: " + sum);
}
getNumbers();





// get valid number from the user
function getValidNumber(numOrder) {
    let isValidNum = false;
    let numValue;

    do {
        const value = prompt("Enter" + numOrder + " :");
        
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



function getValidZ() {
    let z;
    let isValidZ = false;

    do {
        z = prompt("Enter z (odd / even / no):");

        if (z != "odd" && z != "even" && z != "no") {
            console.log("Please enter a valid Z.");
        } else {
            isValidZ = true;
        }
    } while (!isValidZ);

    return z;
}