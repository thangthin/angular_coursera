"use strict";
(function() {

    var app = angular.module("MenuApp");

    app.component("items", {
        templateUrl: "items.html",
        bindings: {
            data: "<"
        }
    });
}());