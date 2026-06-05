import { describe, it, expect } from "@jest/globals";
import { fizzbuzz } from "./fizzbuzz";

describe("print the same number as a string", () => {
  it("returns '1' for 1", () => {
    expect(fizzbuzz(1)).toBe("1");
  });
  it("returns '47' for 47", () => {
    expect(fizzbuzz(47)).toBe("47");
  });
});

describe("print 'Fizz' if number is divisible by 3", () => {
  it("returns 'Fizz' for 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });
  it("returns 'Fizz' for 27", () => {
    expect(fizzbuzz(27)).toBe("Fizz");
  });
  it("returns 'Fizz' for 99", () => {
    expect(fizzbuzz(99)).toBe("Fizz");
  });
});

describe("print 'Buzz' if number is divisible by 5", () => {
  it("returns 'Buzz' for 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  });
  it("returns '25' for 25", () => {
    expect(fizzbuzz(25)).toBe("Buzz");
  });
  it("returns 'Buzz' for 70", () => {
    expect(fizzbuzz(70)).toBe("Buzz");
  });
  it("returns 'Buzz' for 100", () => {
    expect(fizzbuzz(100)).toBe("Buzz");
  });
});

describe("print 'FizzBuzz' if number is divisible by 5 and 3", () => {
  it("returns 'FizzBuzz' for 15", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });
  it("returns 'FizzBuzz' for 60", () => {
    expect(fizzbuzz(60)).toBe("FizzBuzz");
  });
});
