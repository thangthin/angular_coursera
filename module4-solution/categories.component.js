"use strict";
(function() {
    var app = angular.module("MenuApp");

    function categories() {
        var vm = this;
        vm.message = "menuapp categories";
    }

    app.component("categories", {
        templateUrl: "categories.html",
        controller: categories
    });
}());