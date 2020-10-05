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
        })
        .state('public.menuItems', {
            url: '/menu/{category}',
            templateUrl: 'src/public/menu-items/menu-items.html',
            controller: 'MenuItemsController as menuItemsCtrl',
            resolve: {
                menuItems: ['MenuService', '$stateParams', function(MenuService, $stateParams){
                    return MenuService.getMenuItems($stateParams.category);
                }]
            }
        })
        .state('public.signUpForm', {
            url: '/signupform',
            templateUrl: 'src/public/sign-up-form/sign-up-form.html',
            controller: 'SignUpFormController',
            controllerAs: 'formCtrl'
        })
        .state('public.userProfile', {
            url: '/userprofile',
            templateUrl: 'src/public/user-profile/user-profile-home.html',
            controller: 'UserProfileHomeController as userProfileHomeCtrl'
        });
    }
})();