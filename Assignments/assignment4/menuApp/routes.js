(function(){

    angular.module('MenuApp').config(routes);

    routes.$inject = ['$urlRouterProvider', '$stateProvider'];
    function routes($urlRouterProvider,$stateProvider){
        //Default to home if invalid url entered by user
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: './src/templates/home.html'
        })

        .state('Categories', {
            url: '/categories',
            templateUrl: './src/templates/categories.html',
            controller: 'CategoriesCtrl as Categories',
            //TODO: implement resolve need to get all restaurant categoris
            resolve: {

            } 
        })
    }

})();