"use strict";
(function() {
    var app = angular.module("MenuApp")
        .controller("categoriesCtrl", categoriesCtrl);

    categoriesCtrl.$inject = ["categories"];

    function categoriesCtrl(categories) {
        var vm = this;
        vm.categories = categories;
    }

}());