(function () {
    'use strict';
    
    angular.module('public')
    .controller('MenuController', MenuController);

    MenuController.$inject = ['menuCategories'];
    function MenuController(menuCategories){
        var $ctrl = this;
        //save the property from the resolve method into a property in our controller
        $ctrl.MenuCategories = menuCategories;
    };
})();