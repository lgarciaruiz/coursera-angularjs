(function(){

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    
    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuy.boughtItem = function(itemIndex){
        ShoppingListCheckOffService.boughtItem(itemIndex)
    };
};

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;

    bought.items = ShoppingListCheckOffService.getItemsBought();

};

function ShoppingListCheckOffService(){
    var shoppingList = this;

    var toBuyList =[
        {
            name: 'underwear',
            quantity: 5
        },
        {
            name: 'toothpaste',
            quantity: 1
        },
        {
            name: 'shampoo',
            quantity: 1
        }
        ,{
            name: 'bidet',
            quantity: 1
        },
        {
            name: 'monitor',
            quantity: 1
        }
    ];

    var alreadyBoughtList = [];

    shoppingList.getItemsToBuy = function(){
        return toBuyList;
    }

    shoppingList.getItemsBought = function(){
        return alreadyBoughtList;
    }

    shoppingList.boughtItem = function(itemIndex){
        alreadyBoughtList.push(toBuyList[itemIndex]);
        toBuyList.splice(itemIndex,1);
    }
};
})();