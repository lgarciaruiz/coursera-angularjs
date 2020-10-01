(function(){
    'use strict';
    angular.module('public').config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider){

        $stateProvider
        .state('public', {
            abstract: true,
            templateUrl: 'src/public/public.html'//gets injected into index.html ui-view
        })
        .state('public.home', {
            url:'/',
            templateUrl: 'src/public/home/home.html'//child of public abstract state, this template will get inserted into parent's ui-view
        })
        .state('public.menu', {
            url: '/menu',
            templateUrl: 'src/public/menu/menu.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl',
            resolve: {
                menuCategories: ['MenuService', function(MenuService){
                    return MenuService.getCategories();
                }]
            }
        });
    }
})();