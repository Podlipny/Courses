// site.js
(function () {
  //var ele = $("#userName");
  //ele.text("Shawn Wildermuth");

  //var main = $("#main");
  //main.on("mouseenter", function () {
  //  main.css("background-color", "#888");
  //});
  //main.on("mouseleave", function () {
  //  main.css("background-color", "");
  //});

  //$(".menu li a").on("click", function () {
  //  alert($(this).text());
  //  return false;
  //});

  var $sidebarAndWrapper = $("#sidebar,#wrapper");

  $("#menuToggle").on("click", function () {
    $sidebarAndWrapper.toggleClass("display-sidebar");
    if ($sidebarAndWrapper.hasClass("display-sidebar")) {
      $(this).text("Show Menu");
    } else {
      $(this).text("Hide Menu");
    }
  });

})();