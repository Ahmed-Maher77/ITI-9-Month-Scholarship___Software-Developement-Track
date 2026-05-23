//*problem 1
//* input: "hamada" ===> output: HAMADA. expect
//* input: 12 ===> output: "".   expect

const capitalizeText = (input) => {
    if (typeof input !== "string") {
        throw new TypeError("parameter should be string");
    }
    return input.toUpperCase();
};

const validateForm = (textValue, numberValue) => {
  const trimmedText = typeof textValue === "string" ? textValue.trim() : "";

  return (
    typeof textValue === "string" &&
    trimmedText !== "" &&
    !/^\d+$/.test(trimmedText) &&
    typeof numberValue === "number" &&
    Number.isFinite(numberValue)
  );
};



//? test that the function takes a string  it will return a string
//? test that the function takes a string and return it after capitalize it
//? test if the function takes number it will throw type error says parameter should be string
//? make sure that this function accept one param only
//& ////////////////////////////////////////////////////////






//* problem 2
//* input number 3 ==> output should be [0,1,2]

const createArray = (number) => {
  const myArray = Array.from(Array(number).keys());
  return myArray;
};

//? test that the return value of type array
//? test if we pass 3 it will return array of length 3 and test it's include 1
//? try to delay the testing process 5 seconds 
//? try to use different styles (expect , should , assert)
//? after finishing your test process try to  run it on a browser//bonus
//? make pending test case

//^ createArray(3)>>>>>[0,1,2]
//^ createArray(5)>>>[0,1,2,3,4]
//& ////////////////////////////////////////////////////////




//* problem 3
let obj = {id:1}
let obj1 = {x:obj}
let obj2 = {x:obj}
//? check whether obj1 is equal to obj2 using expect , should and assert

//& ////////////////////////////////////////////////////////



//* problem 4 
function CheckPositivity(x){
  if(x>0){
    return true
  }else{
    return false
  }
}

//? check the expected value using expect , should and assert if x = 4 , x = -1 and x=0 
//& ////////////////////////////////////////////////////////



//* problem 5
function Mult(x){
  return x*2;
}
//? using assert 
//? 1- make sure that x > 0 
//? 2- make sure that the returned number will be above zero 

//& ////////////////////////////////////////////////////////////



//* problem 6
let obj3 = {a: {b: [{x: 1}]}}
//? using assert check 'a.b[0]' will include {x: 1}

//& ////////////////////////////////////////////////////////


//* problem 7 [Bonus]
//? make a form with two inputs [number and string] in your html and validate the values of those inputs


if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        capitalizeText,
        createArray,
        obj,
        obj1,
        obj2,
        obj3,
        CheckPositivity,
        Mult,
    validateForm,
    };
}

if (typeof window !== "undefined") {
    window.capitalizeText = capitalizeText;
    window.createArray = createArray;
  window.obj = obj;
  window.obj1 = obj1;
  window.obj2 = obj2;
    window.CheckPositivity = CheckPositivity;
    window.Mult = Mult;
    window.obj3 = obj3;
  window.validateForm = validateForm;

  const form = document.getElementById("myForm");
  const message = document.getElementById("formMessage");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const textValue = document.getElementById("username").value;
      const numberInput = document.getElementById("age");
      const numberValue = numberInput.value === "" ? NaN : Number(numberInput.value);

      const nameIsValid = typeof textValue === "string" && textValue.trim() !== "" && !/^\d+$/.test(textValue.trim());
      const ageIsValid = typeof numberValue === "number" && Number.isFinite(numberValue);

      message.hidden = false;
      message.innerHTML = `
        <p>Name: ${nameIsValid ? "valid" : "invalid"}</p>
        <p>Age: ${ageIsValid ? "valid" : "invalid"}</p>
      `;
    });
  }
}