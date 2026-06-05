/*
FizzBuzz is a simple number game i which you count, but replace certain numbers with words "Fizz" and/or "Buzz", here are the rule:

1) Create a FizzBuzz() method that prints out the number. ==> Done
2) Instead of numbers divisible by 3, the method should output "Fizz".  ==> Done
3) Instead of numbers divisible by 5, the method should output "Buzz". ==> Done
4) Instead of numbers divisible by 3 and 5, the method should output "FizzBuzz". ==> Done
*/

const FIZZ_CONSTANT = "Fizz";
const BUZZ_CONSTANT = "Buzz";
const FIZZBUZZ_CONSTANT = "FizzBuzz";

// V1
/*
export function fizzbuzz(n: number): string {
  return n.toString();
}
*/

// V2
/*
export function fizzbuzz(n: number): string {
  if (n % 3 == 0) return FIZZ_CONSTANT;
  return n.toString();
}
*/

// V3
/*
export function fizzbuzz(n: number): string {
  if (n % 3 == 0) return FIZZ_CONSTANT;
  if (n % 5 == 0) return BUZZ_CONSTANT;
  return n.toString();
}
*/

// V4
/*
export function fizzbuzz(n: number): string {
  if (n % 3 == 0 && n % 5 == 0) return FIZZBUZZ_CONSTANT;
  if (n % 3 == 0) return FIZZ_CONSTANT;
  if (n % 5 == 0) return BUZZ_CONSTANT;
  return n.toString();
}
*/

// V5 (Refactor of V4)
export function fizzbuzz(n: number): string {
  if (isFizz(n) && isBuzz(n)) return FIZZBUZZ_CONSTANT;
  if (isFizz(n)) return FIZZ_CONSTANT;
  if (isBuzz(n)) return BUZZ_CONSTANT;
  return n.toString();
}

function isFizz(n: number) {
  return n % 3 == 0;
}

function isBuzz(n: number) {
  return n % 5 == 0;
}
