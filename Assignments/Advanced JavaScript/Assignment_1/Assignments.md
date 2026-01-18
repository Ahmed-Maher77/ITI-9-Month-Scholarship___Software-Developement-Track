# Advanced JavaScript - Lab 1

## A. Object - Linked List Implementation

### A.1. Custom Linked List Object

Create your own custom Object that simulates a linked list that accepts objects with a single numeric property value in ascending order.

#### Object Structure

```javascript
LnkdLstObj = {
  data: [{val:1}, {val:2}, {val:3}, {val:4}, {val:5}, etc.],
  pushVal: function(){},
  // other methods...
}
```

#### Required Functionalities

1. **Enqueue**: Add a value as long as the value is in the sequence, otherwise throw an exception
2. **Push**: Add an item at the end of the list with the passed value
3. **Insert**: Add an item in a specific place as long as the value is missing from the sequence, otherwise throw an exception
4. **Pop**: Remove an item from the end of the list and return its value
5. **Remove**: Remove an item from a specific place with the required value. If the value is not found, return a message "data not found"
6. **Dequeue**: Remove an item from the beginning of the list and return its value
7. **Display**: Display the content of the list
8. **Validation**: Ensure that there is no duplication in entered values

#### Notes

-   Use Array Object methods
-   No need to use `sort()` function
-   You can add any properties you need
-   The list should maintain ascending order

---

## B. Function & Error Objects

### B.1. Reverse Collection Function

Write **two different functions** with **two different implementations** that take any number of parameters and return them as a reversed collection using array's `reverse()` function.

#### Requirements

-   Must accept any number of parameters
-   Must use array's `reverse()` function
-   **Using any loop is NOT allowed**
-   Implement two different approaches

---

### B.2. Getter/Setter Generator

Create your own custom object that has `getSetGen` as a function value. This function should generate setters and getters for the properties of the caller object.

#### Requirements

1. The object may have a `description` property of string value if needed
2. Any other created object can use this function property to generate getters and setters for its own properties
3. **Avoid generating getters or setters for any property of function value**

#### How It Works

If `getSetGen()` is applied on any other object, it should generate getters and setters for all of the applied object properties.

#### Example 1

```javascript
obj = {
    id: "SD-10",
    location: "SV",
    addr: "123 st.",
    getSetGen: function () {
        /*should be implemented*/
    },
};
```

Using `getSetGen()` will generate the following methods:

-   `getId()`, `setId()`
-   `getLocation()`, `setLocation()`
-   `getAddr()`, `setAddr()`

#### Example 2

```javascript
var user = {
    name: "Ali",
    age: 10,
};
```

When applying `getSetGen()` on the user object (you can use `call`, `bind`, or `apply`), it will result in creating the following methods:

-   `getName()`, `setName()`
-   `getAge()`, `setAge()`

#### Hints

-   Use `call`, `bind`, or `apply` to apply the function on different objects
-   Filter out properties with function values
-   Generate getter/setter names dynamically based on property names
