(function(){
    'use strict';

    angular.module('public')
    .service('SingUpFormService',SingUpFormService);

    function SingUpFormService(){
        var service = this;

        var userProfile;

        service.getUser = function(){
            return userProfile;
        };

        service.setUserSettings = function(user){
            userProfile = user
        };
    };

})();