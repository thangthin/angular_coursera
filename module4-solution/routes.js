"use strict";
(function() {
    var app = angular.module("MenuApp");

    app.config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider.state("home", {
                url: "/home",
                template: "<div>This is home</div>"
            })
            .state("categories", {
                url: "/categories",
                template: "<categories categories='catCtrl.categories'></categories>",
                controller: "categoriesCtrl as catCtrl",
                resolve: {
                    categories: ["MenuDataService", function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state("items", {
                url: "/items/{catShortName}",
                template: "<items data='itmCtrl.items'></items>",
                controller: "itemsCtrl as itmCtrl",
                resolve: {
                    items: ["$stateParams", "MenuDataService", function($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.catShortName);
                    }]
                }
            })
    }

}());