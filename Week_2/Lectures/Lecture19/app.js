(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ParentController1', ParentController1)//when you pass the ParentController1 function to the controller, it gets treated as a function contructor
.controller('ChildController1', ChildController1)
.controller('ParentController2', ParentController2)
.controller('ChildController2', ChildController2);

ParentController1.$inject = ['$scope'];
function ParentController1($scope) {
  $scope.parentValue = 1; //primitive type value
  $scope.pc = this;
  $scope.pc.parentValue = 1;
}


ChildController1.$inject = ['$scope'];
function ChildController1($scope) {
//   console.log("$scope.parentValue: ", $scope.parentValue);
//   console.log("CHILD $scope: ", $scope);
  
//   $scope.parentValue = 5; //this will mask the parentValue becuase it is a primitive type value
//   console.log("*** CHANGED: $scope.parentValue = 5 ***");
//   console.log("$scope.parentValue: ", $scope.parentValue);
//   console.log($scope);
  
//   console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
//   $scope.pc.parentValue = 5;
//   console.log("** CHANGED: $scope.pc.parentValue = 5; ***");
//   console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
//   console.log("$scope: ", $scope);
  
//   console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
}

// ** Controller As syntax; $scope not needed because the properties of this controller will be added to the property named parent which is already a property in the $scope
function ParentController2() {
  var parent = this;
  parent.value = 1;
}
//$scope injected here just to log it to console
ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
  var child = this;
  child.value = 5;
  console.log("ChildController2 $scope: ", $scope);
}

})();
