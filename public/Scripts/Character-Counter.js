$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const length = this.value.length;
    const counter = $(this).closest("form").find(".counter");
    counter.text(140 - length);
    if (length > 140) {
      counter.addClass("limit")
      return;
    }
    counter.removeClass("limit")
  });
});