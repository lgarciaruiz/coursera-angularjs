(function(){
    'use strict';
    angular.module('public')
    .controller('UserProfileHomeController', UserProfileHomeController);

    UserProfileHomeController.$inject = ['ApiPath', 'SingUpFormService'];
    function UserProfileHomeController(ApiPath, SingUpFormService){
        var $ctrl = this;
        var formService = SingUpFormService;

        $ctrl.user = formService.getUser();

    };
})();