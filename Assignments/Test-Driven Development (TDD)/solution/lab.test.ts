import { describe, it, expect } from "@jest/globals";
import { StringCalculator } from "./lab";

describe("StringCalculator.Add - Version 1 (Basic Cases)", () => {
  it("returns 0 for an empty string", () => {
    expect(StringCalculator.Add("")).toBe(0);
  });

  it("returns the number itself for a single number", () => {
    expect(StringCalculator.Add("1")).toBe(1);
    expect(StringCalculator.Add("5")).toBe(5);
  });

  it("returns the sum of two comma-separated numbers", () => {
    expect(StringCalculator.Add("1,2")).toBe(3);
    expect(StringCalculator.Add("10,20")).toBe(30);
  });
});

describe("StringCalculator.Add - Version 2 (Unknown Amount of Numbers)", () => {
  it("returns the sum of an unknown amount of comma-separated numbers", () => {
    expect(StringCalculator.Add("1,2,3")).toBe(6);
    expect(StringCalculator.Add("1,2,3,4,5,6,7,8,9,10")).toBe(55);
  });
});

describe("StringCalculator.Add - Version 3 (Newline Delimiters)", () => {
  it("handles newlines between numbers instead of commas", () => {
    expect(StringCalculator.Add("1\n2,3")).toBe(6);
    expect(StringCalculator.Add("10\n20\n30")).toBe(60);
  });
});

describe("StringCalculator.Add - Version 4 (Negatives Exception)", () => {
  it("throws an exception for a negative number, showing the negative in the message", () => {
    expect(() => StringCalculator.Add("-1")).toThrow("negatives not allowed: -1");
    expect(() => StringCalculator.Add("1,-2,3")).toThrow("negatives not allowed: -2");
  });

  it("throws an exception showing all negatives in the message when multiple negatives are passed", () => {
    expect(() => StringCalculator.Add("1,-2,3,-4")).toThrow("negatives not allowed: -2, -4");
    expect(() => StringCalculator.Add("-10\n-20,30")).toThrow("negatives not allowed: -10, -20");
  });
});



