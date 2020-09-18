(function(){
angular.module('MenuApp')
.controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['categoriesData'];
function CategoriesCtrl(categoriesData){
    var ctrl = this;

    ctrl.list = categoriesData.data;

};
})();