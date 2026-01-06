function adding() {
    // take a value from the user  => iterative process
    // if: value is a number
    // T => add to the sum
    // F => throw an exception => then return the sum

    let sum = 0;
    let isValid = true;
    try {
        do {
            const value = Number(prompt("Enter a number: "));
            if (!isNaN(value)) {
                sum += value;
            } else {
                isValid = false;
                throw new Error("you passed a non-numeric value");
            }
        } while (isValid);
    } catch (err) {
        console.log(err.message);
    } finally {
        console.log("sum is: " + sum);
    }
}
adding();
