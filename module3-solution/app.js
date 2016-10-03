"use strict";
(function() {

    function NarrowItDownController(MenuSearchService) {
        var vm = this;
        var warningMessage = "Nothing Found";
        var errorMessage = "Can't get data from server";
        vm.searchForMenu = function(searchTerm) {
            if (searchTerm) {
                var searchPromise = MenuSearchService.getMatchedMenuItems(searchTerm);
                vm.warningMessage = "";
                vm.errorMessage = "";
                vm.pendingData = true;
                searchPromise.then(function(result) {
                    vm.found = result;
                    if (!vm.found.length) {
                        vm.warningMessage = warningMessage;
                        vm.errorMessage = "";
                    } else {
                        vm.warningMessage = "";
                        vm.errorMessage = "";
                    }
                    vm.pendingData = false;
                }).catch(function() {
                    vm.errorMessage = errorMessage;
                    vm.pendingData = false;
                });
            } else {
                vm.warningMessage = warningMessage;
                vm.errorMessage = "";
                vm.found = [];
            }
        };

        vm.remove = function(index) {
            vm.found.splice(index, 1);
        }
    }

    function MenuSearchService($http) {
        var service = this;
        // helper function to filter out data that matches search term;
        function filterData(data, searchTerm) {
            var result = data.filter(function(item) {
                // return items with description containing searchTerm
                return (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            });
            return result;
        }

        function getMatchedMenuItems(searchTerm) {
            var url = "https://davids-restaurant.herokuapp.com/menu_items.json";
            return $http.get(url)
                .then(function(data) {
                    var filteredData = filterData(data.data.menu_items, searchTerm);
                    return filteredData;
                }, function(error) {
                    console.log(error);
                });
        }

        service.getMatchedMenuItems = getMatchedMenuItems;
    }

    function FoundItemsDirectiveController() {
        var FIDCtrl = this;
    }

    function FoundItemsDirective() {
        return {
            restrict: "E",
            templateUrl: "foundItemsDirective.html",
            scope: {
                foundItems: "<",
                onRemove: "&"
            },
            controller: "FoundItemsDirectiveController",
            controllerAs: "FIDCtrl",
            bindToController: true,
        };
    }

    function itemsLoaderIndicatorDirective() {
        function link(scope, element, attrs, controller) {
            var loadingDiv = element.find("div");

            scope.$watch(function() {
                return scope.loading
            }, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue) {
                        loadingDiv.css("display", "block");
                    } else {
                        loadingDiv.css("display", "none");
                    }
                }
            });
        }

        return {
            restrict: "E",
            scope: {
                loading: "<"
            },
            templateUrl: "itemsLoaderIndicatorDirective.html",
            controller: "NarrowItDownController",
            link: link
        };
    }

    var app = angular.module("NarrowItDownApp", []);
    app.controller("NarrowItDownController", ["MenuSearchService", NarrowItDownController]);
    app.controller("FoundItemsDirectiveController", [FoundItemsDirectiveController]);
    app.service("MenuSearchService", ["$http", MenuSearchService]);
    app.directive("foundItems", [FoundItemsDirective]);
    app.directive("itemsLoaderIndicator", [itemsLoaderIndicatorDirective]);

}());