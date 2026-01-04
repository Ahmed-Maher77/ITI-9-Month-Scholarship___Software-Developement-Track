const form = document.querySelector("form");


// get confirmation
// based on the answer
    // T => submit
    // F => stop submitting

form.onsubmit = function() {
    event.preventDefault();
    const isConfirmed = confirm("Are you sure from submitting?");
    if (isConfirmed) {
        form.submit();
        console.log("Submitted");
    }
    console.log("Submission stopped");
}