import * as chai from "./node_modules/chai/index.js";

const { expect } = chai;
chai.should();

const capitalizeText = window.capitalizeText;
const validateForm = window.validateForm;

describe("capitalizeText Function", () => {
    it("should return a string", () => {
        expect(capitalizeText("hamada")).to.be.a("string");
    });

    it("should capitalize the input string", () => {
        expect(capitalizeText("hamada")).to.equal("HAMADA");
    });

    it("should throw TypeError if input is number", () => {
        expect(() => capitalizeText(12)).to.throw(
            TypeError,
            "parameter should be string",
        );
    });

    it("should accept one parameter only", () => {
        expect(capitalizeText.length).to.equal(1);
    });
});

describe("Form Validation Tests", () => {
    it("should return true for valid inputs", () => {
        expect(validateForm("Ahmed", 25)).to.equal(true);
    });

    it("should return false for empty string", () => {
        expect(validateForm("", 25)).to.equal(false);
    });

    it("should return false for non-string name", () => {
        expect(validateForm(123, 25)).to.equal(false);
    });

    it("should return false for NaN number", () => {
        expect(validateForm("Ahmed", NaN)).to.equal(false);
    });

    it("should return false for string number", () => {
        expect(validateForm("Ahmed", "25")).to.equal(false);
    });

    it("should return false for numeric name", () => {
        expect(validateForm("20", 20)).to.equal(false);
    });
});

mocha.run();
