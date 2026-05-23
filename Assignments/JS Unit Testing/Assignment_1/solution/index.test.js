const { expect, assert } = require("chai");
const should = require("chai").should();
const {
  capitalizeText,
  createArray,
  obj,
  obj1,
  obj2,
  obj3,
  CheckPositivity,
  Mult,
  validateForm,
} = require("./index");


// ============== problem 1 solution ==============
describe("capitalizeText Function", () => {
    // test return type
    it("should return a string", () => {
        expect(capitalizeText("hamada")).to.be.a("string");
    });

    // test capitalization
    it("should capitalize the input string", () => {
        expect(capitalizeText("hamada")).to.equal("HAMADA");
    });

    // test error throwing
    it("should throw TypeError if input is number", () => {
        expect(() => capitalizeText(12)).to.throw(
            TypeError,
            "parameter should be string",
        );
    });

    // test number of parameters
    it("should accept one parameter only", () => {
        expect(capitalizeText.length).to.equal(1);
    });
});




// ============== problem 2 solution ==============
describe("createArray Function", function () {

  // delay testing 5 seconds
  this.timeout(6000);

  it("should return array", () => {
    expect(createArray(3)).to.be.an("array");
  });

  it("should return array length 3 and include 1", () => {

    const result = createArray(3);

    // expect style
    expect(result.length).to.equal(3);

    // should style
    result.should.include(1);

    // assert style
    assert.include(result, 1);
  });

  // delayed test
  it("should delay for 5 seconds", (done) => {

    setTimeout(() => {

      expect(createArray(3)).to.deep.equal([0,1,2]);

      done();

    }, 5000);

  });

  // pending test
  it("pending test case");

});



// ============== problem 3 solution ==============
describe("Objects Equality", () => {

  it("should compare objects", () => {

    // expect
    expect(obj1).to.deep.equal(obj2);

    // should
    obj1.should.deep.equal(obj2);

    // assert
    assert.deepEqual(obj1, obj2);

  });

});



// ============== problem 7 solution ==============
describe("Form Validation", () => {

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




// ============== problem 4 solution ==============
describe("CheckPositivity", () => {

  it("x = 4", () => {

    expect(CheckPositivity(4)).to.equal(true);

    CheckPositivity(4).should.equal(true);

    assert.equal(CheckPositivity(4), true);

  });

  it("x = -1", () => {

    expect(CheckPositivity(-1)).to.equal(false);

    CheckPositivity(-1).should.equal(false);

    assert.equal(CheckPositivity(-1), false);

  });

  it("x = 0", () => {

    expect(CheckPositivity(0)).to.equal(false);

    CheckPositivity(0).should.equal(false);

    assert.equal(CheckPositivity(0), false);

  });

});



// ============== problem 5 solution ==============
describe("Mult Function", () => {

  it("x should be above zero", () => {

    assert.isAbove(5, 0);

  });

  it("returned value should be above zero", () => {

    assert.isAbove(Mult(5), 0);

  });

});



// ============== problem 6 solution ==============
describe("Nested Object", () => {

  it("should include {x:1}", () => {

    assert.deepInclude(
      obj3.a.b,
      { x: 1 }
    );

  });

});