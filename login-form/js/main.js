(function ($) {
  "use strict";

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var pass = $("#password-login");
    if (pass.attr("type") == "password") {
      pass.attr("type", "text");
    } else {
      pass.attr("type", "password");
    }
  });
})(jQuery);
