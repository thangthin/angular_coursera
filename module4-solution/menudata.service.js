"use strict";
(function() {
    var dataModule = angular.module("data");


    function MenuDataService($http) {
        var service = this;
        service.getAllCategories = function() {
            console.log("calling getAllCategories");
            return $http.get("https://davids-restaurant.herokuapp.com/categories.json")
                .then(function(response) {
                    return response.data;
                });
        };

        service.getItemsForCategory = function(categoryShortName) {
            console.log("called getItemsForCategories from menuDataService");
            return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
                .then(function(response) {
                    return response.data;
                });
        };
    }

    dataModule.service("MenuDataService", ["$http", MenuDataService]);
}());