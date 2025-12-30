// ask the user to enter the number of array elements (numbers)
// create an array 
// ask the user to enter the array elements => Loop
// sort the array in ASC/DSC order
// print the 2 sorted arrays



function getSortedNumers() {
    const numbersCount = getValidNumber("Enter the number of array elements: ");
    let numbersArr_ASC = [];
    let numbersArr_DSC = [];

    for (let i = 0; i < numbersCount; i++) {
        const number = getValidNumber("enter a valid number: ");
        numbersArr_ASC.push(number);
        numbersArr_DSC.push(number);
    }

    numbersArr_ASC.sort((a, b) => a - b);
    numbersArr_DSC.sort((a, b) => b - a);

    console.log("Number Array in ASC order: ", numbersArr_ASC);
    console.log("Number Array in DSC order: ", numbersArr_DSC);
};

getSortedNumers();




function getValidNumber(type) {
    let valueNumber;
    let isValid = false;
    
    do {
        let value = prompt(type);
        valueNumber = Number(value);

        if (value.trim() !== "" && !isNaN(valueNumber)) {
            isValid = true;
        }
    } while(!isValid)

    return valueNumber;
}