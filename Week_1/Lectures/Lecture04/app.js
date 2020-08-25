(function(){
'use strict';

    angular.module('myFirstApp', [])

    .controller('myFirstController', function($scope){
        $scope.name = "Leo";
        $scope.sayHello = function (){
            return "Hello coursera";
        };
    });
    
})();
