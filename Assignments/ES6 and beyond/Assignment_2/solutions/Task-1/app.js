function generateCourse(courseInfo) {
    const defaultObj = {
        // difference?
        courseName: "ES6",
        courseDuration: "3 days",
        courseOwner: "Javascript",
    };

    // check if courseInfo is an object
    if (typeof courseInfo !== "object")
        throw new Error("courseInfo must be an object.");

    // check if courseInfo is empty
    if (Object.keys(courseInfo).length === 0)
        throw new Error("courseInfo must not be empty.");

    // check if there are any undesired properties in courseInfo
    for (const key in courseInfo) {
        if (!(key in defaultObj))
            throw new Error(`Property ${key} is not allowed.`);
    }

    // const finalCourse = { ...defaultObj, ...courseInfo };
    // another solution:
    const finalCourse = Object.assign({}, defaultObj, courseInfo);

    return finalCourse;
}

// Test 1: Valid - all properties
console.log(
    generateCourse({
        courseName: "JavaScript",
        courseDuration: "3 months",
        courseOwner: "ITI",
    }),
);

// Test 2: Valid - partial properties
console.log(generateCourse({ courseName: "React" }));

// Test 3: Invalid - empty object
try {
    generateCourse({});
} catch (e) {
    console.log(e.message);
}

// Test 4: Invalid - not an object
try {
    generateCourse("ES6");
} catch (e) {
    console.log(e.message);
}

// Test 5: Invalid - unallowed property
try {
    generateCourse({ courseName: "JS", courseFee: "free" });
} catch (e) {
    console.log(e.message);
}
