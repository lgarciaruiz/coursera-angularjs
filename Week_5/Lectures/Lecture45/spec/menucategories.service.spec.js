describe('menucategories', function () {

  var menucategories;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('MenuCategoriesApp');

    inject(function ($injector) {
      //even though the service has some dependecies injected, when we use the $injector.get method we don't need to do that, angular will do that automatically
      menucategories = $injector.get('MenuCategoriesService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should return categories list', function() {
    // when we call the url, intercept and return an array with two strings lunch and dessert
    $httpBackend.whenGET(ApiBasePath + '/categories.json').respond(['Lunch', 'Dessert']);
    //make the call with the method you want to test and use the .then method becuase it returns a promise 
    menucategories.getMenuCategories().then(function(response) {
      //check if data is equal to what you expect
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    //flush the service so that it stops immediatly
    $httpBackend.flush();
  });

});
