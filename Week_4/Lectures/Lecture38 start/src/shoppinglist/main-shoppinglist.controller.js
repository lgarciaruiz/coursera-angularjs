(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


// MainShoppingListController.$inject = ['ShoppingListService'];
MainShoppingListController.$inject = ['items'];
function MainShoppingListController(items) {
  var mainList = this;
  // set controller items binding equal to the injected items that comes from the resolve property
  mainList.items = items;

  // mainList.$onInit = function () {
  //   ShoppingListService.getItems()
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // }; 
}

})();
