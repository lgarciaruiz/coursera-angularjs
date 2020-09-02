(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
//method that gets invoked on the angular module and set to a value
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

  //get promise for menu categories
  var promise = MenuCategoriesService.getMenuCategories();

  //resolve promise
  promise.then(function (response) {
    //sets variable categories equal to the response.data which is a json string which is automatically converted into an array of object literals
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.", error);
  });

  menu.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}

//once you register the constant you also need to inject it as a dependency where you want to use it
MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    //$http returns a promise
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),//when concatinating you need to surrond in parens so angular knows it's one value
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
