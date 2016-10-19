"use strict";
(function() {
    var app = angular.module("MenuApp");

    app.component("categories", {
        templateUrl: "categories.html",
        bindings: {
            categories: "<"
        }
    });
}());