(function(){

    angular.module('MenuApp')
    .config(routes);

    routes.$inject = ['$urlRouterProvider', '$stateProvider'];
    function routes($urlRouterProvider,$stateProvider){
        //Default to home if invalid url entered by user
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: './src/templates/home.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: './src/templates/main-categories.html',
            controller: 'CategoriesCtrl as Categories',
            resolve: {
                categoriesData: ['MenuDataService', 
                    function(MenuDataService){
                        return MenuDataService.getAllCategories();
                    }
                ]
            } 
        })

        .state('items', {
            url: '/items/{itemId}',
            templateUrl: './src/templates/main-items.html',
            controller: 'ItemsCtrl as Items',
            resolve: {
                itemsData: ['MenuDataService', '$stateParams', function(MenuDataService,$stateParams){
                    return MenuDataService.getItemsForCategory($stateParams.itemId);
                }]
            }
        });
    }

})();