"use strict";
(function() {

    var app = angular.module("MenuApp");

    function items() {
        var vm = this;
    }

    app.component("items", {
        templateUrl: "items.html",
        controller: items
    });
}());