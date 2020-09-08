(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('narrowItDownController', NarrowItDownController)
.service('menuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('API_BASE_PATH', 'https://davids-restaurant.herokuapp.com/menu_items.json');

NarrowItDownController.$inject = ['menuSearchService']
function NarrowItDownController(menuSearchService) {
    var narItDwnCtrl = this;

    narItDwnCtrl.searchTerm;
    
    narItDwnCtrl.searchItem = function () {
        console.log(narItDwnCtrl.searchTerm);
        if (narItDwnCtrl.searchTerm){
            //retrieve promise and set it to found property
            var promise = menuSearchService.getMatchedMenuItems(narItDwnCtrl.searchTerm);
            promise.then(function(result){
                narItDwnCtrl.found = result;
                narItDwnCtrl.nothingFound = narItDwnCtrl.found.length > 0 ? false : true;
            })
        } else {
            narItDwnCtrl.nothingFound = true;
        }
    };

    narItDwnCtrl.removeItem = function(index) {
        narItDwnCtrl.found.splice(index,1);
    };
}

function FoundItemsDirective() {
    var ddo = {
        scope: {
            items: '<',
            onRemove: '&',
            notFound: '<',
        },
        templateUrl: './foundItems.html'
    };
  
    return ddo;
  }

MenuSearchService.$inject = ['$http','API_BASE_PATH'];
function MenuSearchService($http, API_BASE_PATH){

    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method:'GET',
            url: API_BASE_PATH
        }).then(function(result){
            var foundItemsArr = [];
            var menuItems = result.data.menu_items;
            for (var i = 0; i < menuItems.length; i++){
                if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                    foundItemsArr.push(menuItems[i])
                }
            }
            return foundItemsArr;
        }).catch(function(error){
            return error;
        });
    }   
}

})();