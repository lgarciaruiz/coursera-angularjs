(function(){
    angular.module('public')
    .controller('SignUpFormController', SignUpFormController);

    SignUpFormController.$inject = ['SingUpFormService', '$http', 'ApiPath'];
    function SignUpFormController(SingUpFormService, $http, ApiPath){
        var $ctrl = this;

        var formService = SingUpFormService;
        $ctrl.signUpCompleted = false;

        $ctrl.submitUser = function(){
            var promise = getFavDish($ctrl.user.favDish);
            promise
            .then(function(response){
                $ctrl.user.userDish = response.data;
                $ctrl.favDishExists = true;
                formService.setUserSettings($ctrl.user);
                console.log($ctrl.user);
                $ctrl.signUpCompleted = true;
            })
            .catch(function (error) {
                $ctrl.favDishExists = false;
            });
        };

        var getFavDish = function(shortName){
            return $http.get(ApiPath + 'menu_items/' + shortName + '.json');
        }
    };
})();