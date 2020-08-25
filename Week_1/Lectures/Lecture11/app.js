(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];

function MsgController($scope) {
  $scope.name = "Yaakov";
  $scope.stateOfBeing= 'hungry';

  $scope.sayMessage = function(){
    return "Leo likes to eat tacos!"
  };

  $scope.feedYakov = function(){
    $scope.stateOfBeing = 'fed';
  };
}

})();
