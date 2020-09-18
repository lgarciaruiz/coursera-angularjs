(function(){

angular.module('MenuApp')
.controller('ItemsCtrl', ItemsCtrl);

ItemsCtrl.$inject = ['itemsData'];
function ItemsCtrl(itemsData){
    var ctrl = this;

    ctrl.menuItems = itemsData.data.menu_items;
    console.log(ctrl.menuItems);
};
})();