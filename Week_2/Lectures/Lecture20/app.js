(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService);//register service with app

ShoppingListAddController.$inject = ['ShoppingListService']; //inject service to share data across controllers
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function () {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


ShoppingListShowController.$inject = ['ShoppingListService']; //inject samev service to share data across controllers
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();
  showList.removeItem = function(itemIndex){
    ShoppingListService.removeItem(itemIndex);
  };
}


function ShoppingListService() {
  var service = this; //becuase it is a function constructor we can use the this keyword to expose it to the outside world; will also make sure we don't have issues with inner functions

  // List of shopping items
  var items = []; //internal not exposing outside of service

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.getItems = function () {
    return items;
  };

  service.removeItem = function(itemIndex){
    items.splice(itemIndex,1);
  };
}

})();
