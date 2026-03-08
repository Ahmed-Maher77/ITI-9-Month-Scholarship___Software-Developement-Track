// 5. Create database with name ITI  by typing use ITI
use ITI;
db.createCollection("instructors");

// 6.a. Insert your own data
db.instructors.insertOne({ firstName: "Ahmed", lastName: "Maher", age: 23, city: "shirbeen" });
db.instructors.find();

// 6.b. Insert instructor without firstName and LastName (mongo will raise an error or not ?)
db.instructors.insertOne({ age: 40, city: "alexandaria" });
db.instructors.find();

// 6.c. Using array contained with lab folder instructors.txt file.
let instructorsArray = [{
    _id: 6, firstName: "noha", lastName: "hesham",
    age: 21, salary: 3500,
    address: { city: "cairo", street: 10, building: 8 },
    courses: ["js", "mvc", "signalR", "expressjs"]
},
{
    _id: 7, firstName: "mona", lastName: "ahmed",
    age: 21, salary: 3600,
    address: { city: "cairo", street: 20, building: 8 },
    courses: ["es6", "mvc", "signalR", "expressjs"]
},
{
    _id: 8, firstName: "mazen", lastName: "mohammed",
    age: 21, salary: 7040,
    address: { city: "Ismailia", street: 10, building: 8 },
    courses: ["asp.net", "mvc", "EF"]
},
{
    _id: 9, firstName: "ebtesam", lastName: "hesham",
    age: 21, salary: 7500,
    address: { city: "mansoura", street: 14, building: 3 },
    courses: ["js", "html5", "signalR", "expressjs", "bootstrap"]
}];
db.instructors.insertMany(instructorsArray);

// 7.a. Display all documents for instructors collection
db.instructors.find();

// 7.b. Display all instructors with fields firstName, lastName and address
db.instructors.find({}, {firstName: 1, lastName: 1, address: 1});
db.instructors.find({}, {firstName: 1, lastName: 1, address: 1, _id: 0});

// 7.c. Display firstName and city(not full address) for instructors with age 21
db.instructors.find({age: 21}, {firstName: 1, address: {city: 1}})
db.instructors.find({age: 21}, {firstName: 1, "address.city": 1})

// 7.d. Display firstName and age for instructors live in Mansoura city
db.instructors.find({"address.city": 'mansoura'}, {firstName: 1, age: true})

// e.1. db.instructors.find({firstName:"mona"},{lastName:"ahmed"},{firstName:1,lastName:1})
db.instructors.find({firstName:"mona"},{lastName:"ahmed"},{firstName:1,lastName:1})

// e.2. db.instructors.find({courses:"mvc"},{firstName:1,courses:1})
db.instructors.find({courses:"mvc"},{firstName:1,courses:1})
db.instructors.find(
  { courses: "mvc" },
  { firstName: 1, courses: { $elemMatch: { $eq: "mvc" } } }
)