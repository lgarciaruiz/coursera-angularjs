(function(){
    'use strict';

    angular.module('common')
    .factory('loadingHttpInterceptor', LoadingHttpInterceptor);

    /**
     * Tracks when a request begins and finishes. When a
     * request starts, a progress event is emitted to allow
     * listeners to determine when a request has been initiated.
     * When the response completes or a response error occurs,
     * we assume the request has ended and emit a finish event.
    */

    LoadingHttpInterceptor.$inject = ['$rootScope','$q'];
    function LoadingHttpInterceptor($rootScope,$q){
        //coutner to keep track of the all the requests that are happening at the same time to know when to turn of the loading spinner
        var loadingCount = 0;
        var loadingEventName = 'spinner:activate';

        return {
            //config is the object that is needed to make the http request like the url, header anything needed
            request: function (config) {
                // console.log('Inside interceptor, config', config);
                if (++loadingCount === 1) {
                    //make the rootscope broadcast the loadingeventname and set on value to true
                    $rootScope.$broadcast(loadingEventName, {on: true});
                }

                return config;
            },

            response: function (response){
                if (--loadingCount === 0){
                    $rootScope.$broadcast(loadingEventName, {on: false});
                }
                return response;
            },

            responseError: function(response){
                if (--loadingCount === 0){
                    $rootScope.$broadcast(loadingEventName, {on: false});
                }
                //we need to explicity reject response so that caller knows this failed
                return $q.reject(response);
            }
        }
    };

})();