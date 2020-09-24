describe("ShoppingListController", function() {

  // the module name needs to be the same name as the actual module
  beforeEach(module('ShoppingListApp'));

  var $controller; //var to assign the $controller service to instantiate the controller
  var shoppingListController; // var to save the controller to

  //inject method to inject $controller service and save it to $controller variables
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    //shoppinglistservice mock
    var ShoppingListServiceErrorMock = {};
    //add the method you need to the mock service and return the values you want
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };
    // this method we don't care about but the controller needs it so it doesnt error out
    ShoppingListServiceErrorMock.getItems = function () {
      return null;
    };

    //instantiate controller; make sure to use the real name the controller was instatiated with in the app module
    // the second arguments is because the controller expects a ShoppingListService(same name as real service) be injected and we set the value of the property to be the fake service created above
    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  //this is the actual test
  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
