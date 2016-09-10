var scrolled;
$(document).ready(function() {
    $("#header").load("../snippets/header.html");
    var scroll = $(window).scrollTop();
    if (scroll == 0) {
        scrolled = false;
    } else {
        scrolled = true;
        $("#main_header").hide().animate({left: "110vw"}, 500);
    }
});

$(window).scroll(function(event) {
    var scroll = $(window).scrollTop();
    $("#main_header").attr("top", scroll * -1)
    if (scrolled && scroll == 0) {
        $("#main_header").fadeIn(400);
        scrolled = false;
    } else if (!scrolled && scroll != 0) {
        $("#main_header").fadeOut(400);
        scrolled = true;
    }
});
