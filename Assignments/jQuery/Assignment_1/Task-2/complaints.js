// Complaints => Form Submission
$('[type="submit"]').click(function (e) {
    e.preventDefault();
    $("#complaints-section form").hide(1000);
    // get the inputs value
    const data = {
        username: $("#username").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        complaint: $("#complain").val(),
    };

    const submitScreen = $("<div>").css("text-align", "center").addClass("submit-screen");
    submitScreen.append("<h2>Thank You!</h2>");

    $.each(data, function (key, value) {
        $("<p>")
            .html("<b>Your " + key + " is: </b>" + value)
            .css("margin-bottom", "10px")
            .appendTo(submitScreen);
    });

    $("<button>").text("Back to edit").addClass("back-btn").css("margin-top", "50px").appendTo(submitScreen);
    $('#complaints-section').append(submitScreen);
    
    // Complaints => back button
    $('.back-btn').click(function () {
        $("#complaints-section form").show(1000);
        $(".submit-screen").hide(1000);
    });
});





// Complaints => nav item
$("#complaints-trigger").click(function () {
    $("#complaints-section").removeClass("hide");
    $("#complaints-section form").show(1000);
    $(".submit-screen").hide(1000);
})