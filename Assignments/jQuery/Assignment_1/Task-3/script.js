// Draggable
$("figure").draggable({
    start: function () {
        $(this).addClass("dragging").css("opacity", "0.7");
    },
    stop: function () {
        $(this).removeClass("dragging").css("opacity", "1");
    },
});

// Droppable
$(".black-hole").droppable({
    accept: "figure",
    drop: function (e, ui) {
        const isAccepted = confirm(
            "Are you sure you want to drop into the black hole?",
        );
        if (isAccepted) ui.draggable.fadeOut(300);
    },
});
