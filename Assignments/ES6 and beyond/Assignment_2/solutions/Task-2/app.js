// fibonacci series:


// a. the parameter passed determines the number of elements displayed from the series.
function* generateFibonacci(countLimit) {
    let count = 0, sum, a = 0, b = 1;
    
    while(count < countLimit) {
        count++;
        sum = a + b;
        a = b;
        b = sum;
        yield sum;
    }
} 


const gen = generateFibonacci(5);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());              // { value: undefined, done: true }


// ==================================================================
console.log("=======================================================");



function* generateFibonacciMax(maxSum) {
    let count = 0, sum = 0, a = 0, b = 1;
    
    while(true) {
        count++;
        sum = a + b;
        if (sum > maxSum) break;
        a = b;
        b = sum;
        yield sum;
    }
}

// 0 1 1 2 3 5 8 13

const gen2 = generateFibonacciMax(12);
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());              // { value: undefined, done: true }