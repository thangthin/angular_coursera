"use strict";
(function() {
    var app = angular.module("ShoppingListCheckOff", []);

    app.controller("ToBuyController", ["ShoppingListCheckOffService", ToBuyController]);

    app.controller("AlreadyBoughtController", ["ShoppingListCheckOffService", AlreadyBoughtController]);

    app.service("ShoppingListCheckOffService", [ShoppingListCheckOffService]);

    function ToBuyController(ShoppingListCheckOffService) {

        var vm = this;
        vm.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
        vm.removeItem = function(index) {
            console.log("removing the", index, "item");
            var item = vm.itemsToBuy[index];
            ShoppingListCheckOffService.addItemToItemsBought(item);
            ShoppingListCheckOffService.removeItem(index);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var vm = this;
        vm.itemsBought = ShoppingListCheckOffService.getItemsBought();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        service.itemsToBuy = [
            { name: "cookies", quantity: 10 },
            { name: "soap", quantity: 2 },
            { name: "toothpaste", quantity: 2 },
            { name: "books", quantity: 3 },
            { name: "towel", quantity: 1 }
        ];

        service.itemsBought = [];

        //api
        service.getItemsToBuy = function() {
            return service.itemsToBuy;
        };

        service.removeItem = function(index) {
            service.itemsToBuy.splice(index, 1);
            return service.itemsToBuy;
        };

        service.getItemsBought = function() {
            return service.itemsBought;
        };

        service.addItemToItemsBought = function(item) {
            service.itemsBought.push(item);
        };

    }

}());