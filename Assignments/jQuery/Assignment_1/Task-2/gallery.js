let currentImageIndex = 1;
$(".contollers button").on("click", function () {
    // Remove active class from all images
    $(".gallery-container img").removeClass("active");

    const isLeft = $(this).attr("id") === "left";

    if (isLeft) {
        currentImageIndex--;
        const currentImg = $(".gallery-container img").eq(currentImageIndex);
        if (currentImageIndex >= 0) {
            currentImg.addClass("active");
            $("#right").attr("disabled", false);
            if (currentImageIndex === 0) {
                $(this).attr("disabled", true);
            }
        }
    } else {
        currentImageIndex++;
        const currentImg = $(".gallery-container img").eq(currentImageIndex);
        if (currentImageIndex < $(".gallery-container img").length) {
            currentImg.addClass("active");
            $("#left").attr("disabled", false);
            if (currentImageIndex === $(".gallery-container img").length - 1) {
                $(this).attr("disabled", true);
            }
        }
    }
});
