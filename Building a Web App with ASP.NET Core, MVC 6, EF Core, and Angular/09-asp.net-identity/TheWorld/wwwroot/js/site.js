// site.js
(function () {

  //var ele = $("#username");
  //ele.text("Shawn Wildermuth");

  //var main = $("#main");
  //main.on("mouseenter", function () {
  //  main.style = "background-color: #888;";
  //});
  //main.on("mouseleave", function () {
  //  main.style = "";
  //});

  //var menuItems = $("ul.menu li a");
  //menuItems.on("click", function () {
  //  var me = $(this);
  //  alert(me.text());
  //});

  var $sidebarAndWrapper = $("#sidebar,#wrapper");
  var $icon = $("#sidebarToggle i.fa");

  $("#sidebarToggle").on("click", function () {
    $sidebarAndWrapper.toggleClass("hide-sidebar");
    if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
      $icon.removeClass("fa-angle-left");
      $icon.addClass("fa-angle-right");
    } else {
      $icon.removeClass("fa-angle-right");
      $icon.addClass("fa-angle-left");
    }
  });
})();