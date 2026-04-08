// Q1
interface User {
    name: string,
    age: number
}
const user1: Pick<User, 'name'> = {
    name: "Ahmed Maher"
};



// Q2
interface Profile {
    username?: string,
    email?: string
}
let userProfile: Required<Profile> = {
    username: "Ahmed Maher",
    email: "ahmed@.com"
}



// Q3
type colorsType = "red" | "green" | "blue";
const colors: Record<colorsType, string> = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
}
console.log("Red color:", colors.red);



// Q4
interface Person {
    name: string,
    age: number,
    email: string,
}
type PersonWithNameAndEmail = Pick<Person, 'name' | 'email'>;
const personWithNameAndEmail: PersonWithNameAndEmail = {
    name: "Ahmed Maher",
    email: "ahmed@.com"
}



// Q5
type PersonWithoutAge = Omit<Person, 'age'>;
const personWithoutAge: PersonWithoutAge = {
    name: "Ahmed Maher",
    email: "ahmed@.com"
}



// Q6
type Colors = "red" | "green" | "blue" | "yellow";
type ColorsWithoutYellow = Exclude<Colors, "yellow">;
let myColor1: ColorsWithoutYellow = "red";   // valid
// let myColor2: ColorsWithoutYellow = "yellow";   // invalid



// Q7
type ColorsWithRedAndBlue = Extract<Colors, "red" | "blue">;
let myColor3: ColorsWithRedAndBlue = "red";   // valid
// let myColor4: ColorsWithRedAndBlue = "green";   // invalid



// Q8
type maybeString = string | null | undefined;
type onlyString = NonNullable<maybeString>;
// let myStr: onlyString = "Hello";

// let myStr: onlyString;
// console.log(myStr);  // undefined