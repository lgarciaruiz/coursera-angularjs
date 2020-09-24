describe("Spec v2: ShoppingListController", function() {

  beforeEach(function () {
    //create service using $provide
    module(function ($provide) {
      //use service method; name service and create the function of what the service is and does
      $provide.service('ShoppingListServiceErrorMock', function () {
        var service = this;
        service.addItem = function (name, quantity) {
          throw new Error("Test message.");
        };

        service.getItems = function () {
          return null;
        };
      });
    });

    //set module mock with same name module of app
    module('ShoppingListApp');
  });

  var $controller;
  var shoppingListController;

  //incjec service created above and controller service
  beforeEach(inject(function (_$controller_, ShoppingListServiceErrorMock) {
    $controller = _$controller_;

    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
