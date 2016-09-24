(function () {

    "use strict";

    var app = angular.module('ShoppingListCheckOff', []);
    app.service('ShoppingListCheckoffService', ShoppingListCheckoffService);
    app.controller('ToBuyShoppingController', ToBuyShoppingController);
    app.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController);

    ToBuyShoppingController.$inject = ['ShoppingListCheckoffService'];
    function ToBuyShoppingController(ShoppingListCheckoffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = function() {
            return ShoppingListCheckoffService.getItemsToBuy();
        }
        toBuyCtrl.isEmpty = function() {
            return !ShoppingListCheckoffService.hasItemsToBuy();
        }
        toBuyCtrl.buyItem = function(itemId) {
            return ShoppingListCheckoffService.buyItem(itemId);
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckoffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckoffService) {
        var alreadyBoughtCtrl = this;
        alreadyBoughtCtrl.items = function() {
          return ShoppingListCheckoffService.getBoughtItems();
        }
        alreadyBoughtCtrl.isEmpty = function() {
          return !ShoppingListCheckoffService.hasBoughtItems();
        }
    }


    function ShoppingListCheckoffService() {
        var service = this;

        // List of shopping items
        var items = [
          { id: 0, name : "Bag of cookies",      quantity : 5,  bought : false },
          { id: 1, name : "Bag of chips",        quantity : 10, bought : false },
          { id: 2, name : "Box of donuts",       quantity : 1,  bought : false  },
          { id: 3, name : "Quart of ice cream",  quantity : 2,  bought : false },
          { id: 4, name : "Pepto Bismol",        quantity : 3,  bought : false },
       ];

       var filterItemsToBuy = function(item) {
         return !(item.bought);
       }
       var filterBoughtItems = function(item) {
         return !!(item.bought);
       }

       service.getItemsToBuy = function() {
         return items.filter(filterItemsToBuy);
       }

       service.getBoughtItems = function() {
         return items.filter(filterBoughtItems);
       }

       service.buyItem = function(itemId) {
         items[itemId].bought = true;
       }

       service.hasItemsToBuy = function() {
         return service.getItemsToBuy().length > 0;
       }

       service.hasBoughtItems = function() {
         return service.getBoughtItems().length > 0;
       }
    }



})();