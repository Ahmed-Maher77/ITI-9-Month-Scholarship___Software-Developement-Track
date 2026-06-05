/*
Create a StringCalculator with the following requirements:

1) method Add(string numbers) that returns an integer.
	Start with the simplest test case of an empty string, then 1 number, then 2.
	An empty string should return a sum of 0.
	String of numbers can include 0, 1, or 2 integers (e.g. "", "1", "1,2").
	Add returns the sum of the integers provided in the string numbers.
	Remember to refactor after each test.

2) Allow the Add method to handle an unknown number of numbers (in the string).

3) Allow the Add method to handle new lines between numbers (instead of commas).
	The following input is ok: “1\n2,3” (will equal 6)

4) Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed. 
	If there are multiple negatives, show all of them in the exception message.
*/

// V1: Handle empty string, 1 number, and 2 numbers.
/*
export class StringCalculator {
  public static Add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    const parts = numbers.split(",");
    if (parts.length === 1) {
      return parseInt(parts[0], 10);
    }
    return parseInt(parts[0], 10) + parseInt(parts[1], 10);
  }
}
*/

// V2: Allow the Add method to handle an unknown number of numbers (in the string).
/*
export class StringCalculator {
  public static Add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    const parts = numbers.split(",");
    return parts.reduce((sum, current) => sum + parseInt(current, 10), 0);
  }
}
*/

// V3: Allow the Add method to handle new lines between numbers (instead of commas).
/*
export class StringCalculator {
  public static Add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    const parts = numbers.split(/[\n,]/);
    return parts.reduce((sum, current) => sum + parseInt(current, 10), 0);
  }
}
*/

// V4: Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed.
// If there are multiple negatives, show all of them in the exception message.
/*
export class StringCalculator {
  public static Add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    const parts = numbers.split(/[\n,]/);
    const parsed = parts.map(numStr => parseInt(numStr, 10));
    const negatives = parsed.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
    }
    return parsed.reduce((sum, current) => sum + current, 0);
  }
}
*/

// V5 (Refactor of V4): Clean production version with extracted helper methods
export class StringCalculator {
  public static Add(numbers: string): number {
    if (this.isEmpty(numbers)) {
      return 0;
    }
    
    const parsedNumbers = this.parseNumbers(numbers);
    this.ensureNoNegatives(parsedNumbers);
    
    return this.sum(parsedNumbers);
  }

  private static isEmpty(numbers: string): boolean {
    return numbers === "";
  }

  private static parseNumbers(numbers: string): number[] {
    const parts = numbers.split(/[\n,]/);
    return parts.map(numStr => parseInt(numStr, 10));
  }

  private static ensureNoNegatives(numbers: number[]): void {
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
    }
  }

  private static sum(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
  }
}




