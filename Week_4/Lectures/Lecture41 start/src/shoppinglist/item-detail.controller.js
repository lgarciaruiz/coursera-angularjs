(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// inject statparams and items to retrieve the parameter in the state an pull out that specific item in the items array
ItemDetailController.$inject = ['$stateParams','items']
function ItemDetailController($stateParams,items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];
  itemDetail.name = item.name;
  itemDetail.quantity = item.quantity;
  itemDetail.description = item.description;
}

})();
