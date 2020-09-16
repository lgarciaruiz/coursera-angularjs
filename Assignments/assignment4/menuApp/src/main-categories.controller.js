(function(){
angular.module('MenuApp')
.controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['categoriesData']
function CategoriesCtrl(categoriesData){
    var ctrl = this;
    ctrl.list;

    categoriesData.getAllCategories().then(function(response){
        ctrl.list = response.data;
        console.log(ctrl.list, 'list');
    })
    .catch(function(error){
        console.log(error);
    });
}
})();