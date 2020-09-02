(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  };

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

  // List of shopping items
  var items = [];

  // this code works but it's a bit messy. the promise uses then methods that have the function the should run as well as the 2nd param which is the error function making it hard to read
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise.then(function (response) {
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  //     nextPromise.then(function (result) {//get result from promise
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };

// this version of the same method uses the catch() mehtod which will catch an error anywhere it happens so the 2nd error function param for the then method can be removed; making it abit easier to read
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  
  //   promise
  //   .then(function (response) {//response but doing nothing with it becuase we knnow in this case response is empty if passed
  //     return WeightLossFilterService.checkQuantity(quantity);
  //   })//no second function for error; if error exists it will bubble up until it gets caught by catch(); this will return a promise and feed it to the next then()
  //   .then(function (response) {//if code gets to here without error that means we are good to add the item to the array
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })
  //   .catch(function (errorResponse) {//handle error in one spot; catches errors from any of the block above
  //     console.log(errorResponse.message);
  //   });
  // };


  //this peice of code runs both checks in parallel; this is asyncronous and will take only the amount of time of the longest promise to resolve instead of all promise times added together
  service.addItem = function (name, quantity) {
    //get both promises for both checks
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    //use .all() method which takes array of promises; any amount
    $q.all([namePromise, quantityPromise]).
    then(function (response) {//the .then() method runs once all promises given in the array have been resolved; however if any of the promises return an error then all promises will stop trying to resolve and it will return an error message
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) { //catch errors in ANY of the promises
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer(); //returns a promise

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)//pass it the result; which is empty if no error
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result); // pass it the result which is result.message with "Stay away from cookies, Yaakov!"
      }
    }, 3000);

    //return the promise back to the caller of function - gives a hook to tap into either resolution or error
    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();
