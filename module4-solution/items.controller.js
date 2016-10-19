"use strict";
(function() {
    var app = angular.module("MenuApp")
        .controller("itemsCtrl", itemsCtrl);

    itemsCtrl.$inject = ["items"];

    function itemsCtrl(items) {
        var vm = this;
        vm.items = items.menu_items;
        vm.message = "items controller message";
        console.log("from controller", vm.items);
    }
}());