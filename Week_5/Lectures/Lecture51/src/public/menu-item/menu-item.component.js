(function(){
    'use strict';

    angular.module('public')
    .component('menuItem',{
        templateUrl: 'src/public/menu-item/menu-item.html',
        bindings: {
            menuItem: '<'
        },
        controller: menuItemController
    });

    menuItemController.$inject = ['ApiPath'];
    function menuItemController(ApiPath){
        var $ctrl = this;
        $ctrl.basePath = ApiPath;
    };
})();