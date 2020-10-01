(function(){
    'use strict';

    angular.module('common', [])
    .constant('ApiPath', 'https://lgarciaruiz-angularjs.herokuapp.com/')
    .config(config);
    
    //need to configure the http provider for the http interceptor
    config.$inject = ['$httpProvider'];
    function config($httpProvider) {
        //load the interceptor factory into the http provider interceptors array so it knows to intercept calls for this 
        $httpProvider.interceptors.push('loadingHttpInterceptor');
    };

})();