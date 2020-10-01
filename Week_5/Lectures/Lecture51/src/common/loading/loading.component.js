(function(){
'use strict';

angular.module('common')
.component('loading',{
    template: '<img src="../../../../../../images/spinner.svg" ng-if="$ctrl.show"></img>',
    controller: LoadingController
});

LoadingController.$inject = ['$rootScope'];
function LoadingController($rootScope){
    var $ctrl = this;
    var listener;

    $ctrl.$onInit = function(){
        $ctrl.show = false;
        //capture the destroy function
        //spinner is namespace for activate event
        listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
    };

    $ctrl.onDestroy = function(){
        //destroy function to stop memory leaks
        listener();
    };

    //angular passes event and data that came with event
   function onSpinnerActivate(event, data){
        //data should be either true or false depending on the event listener data
        $ctrl.show = data.on;
    };
};  

})();