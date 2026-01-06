function accpetsTwo(v1, v2) {
    if (arguments.length != 2)
        throw new Error("Invalid number of arguments");

    console.log("arguments count is correct");
}



accpetsTwo("v1", "v2");

try {
    accpetsTwo(10);
} catch (err) {
    console.log(err.message);
}

try {
    accpetsTwo(10, "v2", 5);
} catch (err) {
    console.log(err.message);
}
