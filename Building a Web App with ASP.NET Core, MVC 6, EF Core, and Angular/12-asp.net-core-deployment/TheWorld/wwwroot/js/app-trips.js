// app-trips.js
(function () {

  "use strict";

  // Creating the Module
  angular.module("app-trips", ["simpleControls", "ngRoute"])
    .config(function ($routeProvider) {

      $routeProvider.when("/", {
        controller: "tripsController",
        controllerAs: "vm",
        templateUrl: "/views/tripsView.html"
      });

      $routeProvider.when("/editor/:tripName", {
        controller: "tripEditorController",
        controllerAs: "vm",
        templateUrl: "/views/tripEditorView.html"
      });

      $routeProvider.otherwise({ redirectTo: "/" });

    });

})();