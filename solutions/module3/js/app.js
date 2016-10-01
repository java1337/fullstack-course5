(function () {

    "use strict";

    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.constant('ServerBaseUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json');
    app.directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDownCtrl = this;
        narrowItDownCtrl.filterText = "";
        narrowItDownCtrl.found = undefined;

        narrowItDownCtrl.findItems = function() {
            var matchedItemsPromise = MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.filterText);
            matchedItemsPromise.then(function(foundItems) {
                console.log('filterText = ', narrowItDownCtrl.filterText);
                console.log("foundItems = ", foundItems);
                narrowItDownCtrl.found = foundItems;
            });
        }
    }

    MenuSearchService.$inject = ['ServerBaseUrl', '$q', '$http'];
    function MenuSearchService(ServerBaseUrl, $q, $http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            var deferred = $q.defer();

            var searchTermLc = searchTerm.toLowerCase().trim();
            if (searchTermLc.length == 0) {
                deferred.resolve([]);
                return deferred.promise;
            }
            var request = {
                method: 'GET',
                url: ServerBaseUrl,
                headers: {
                    'Accepts': 'application/json'
                },
                data: { q: searchTerm }
            };


            $http(request).then(function (result) {
                // process result and only keep items that match
                var items = result.data['menu_items'];
                var searchTermLc = searchTerm.toLowerCase().trim();
                if (searchTermLc.length == 0) {
                    deferred.resolve(items);
                } else {
                    var filtered = items.filter(function (item) {
                        console.log("desc = ", item.description);
                        return !item.description.toLowerCase().includes(searchTermLc);
                    });
                    deferred.resolve(filtered);
                }
            });

            return deferred.promise;
        }
    }

    function FoundItems() {
        var ddo = {
            templateUrl : ''
        };

        return ddo;
    }
})();