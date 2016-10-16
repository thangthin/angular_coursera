"use strict";
(function() {
    var dataModule = angular.module("data");


    function MenuDataService($http) {
        var service = this;
        service.getAllCategories = function() {
            console.log("called getAllCategories from menuDataService");
        };

        service.getItemsForCategories = function(categoryShortName) {
            console.log("called getItemsForCategories from menuDataService");
        };
    }

    dataModule.service("MenuDataService", ["$http", MenuDataService]);
}());