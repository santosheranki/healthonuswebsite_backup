$(document).ready(function () {
  $("#navbarSupportedContent ul li").on("mouseenter", function () {
    $(this).first().children().last().addClass("show");
  });
  $("#navbarSupportedContent ul li").on("mouseleave", function () {
    $(this).first().children().last().removeClass("show");
  });
});
