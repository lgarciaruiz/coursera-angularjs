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

    narItDwnCtrl.searchTerm = '';
    
    narItDwnCtrl.searchItem = function () {
        //retrieve promise and set it to found property
        var promise = menuSearchService.getMatchedMenuItems(narItDwnCtrl.searchTerm);
        promise.then(function(result){
            narItDwnCtrl.found = result;
            //console.log(narItDwnCtrl.found);
        })
    };

    narItDwnCtrl.removeItem = function(index) {
        narItDwnCtrl.found.splice(index,1);
    };
}

function FoundItemsDirective() {
    var ddo = {
        scope: {
            items: '<',
            onRemove: '&'
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