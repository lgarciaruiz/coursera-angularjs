describe('shoppingList directive', function() {
  var $compile;
  var $rootScope;

  var expectedHtml = '<h3 class="ng-binding">test title</h3>\
  <ol>\
    <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      1 of item 1 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      2 of item 2 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --> \
  </ol>'.replace(/\s/g, ''); // removes spaces

  beforeEach(module('ShoppingListDirectiveApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  //to stop angular js from asynchronously getting the html template file we use $templateCache
  beforeEach(inject(function($templateCache) {
    var directiveTemplate = null;
    var req = new XMLHttpRequest();
    req.onload = function() {
        directiveTemplate = this.responseText;
    };

    // Note that the relative path may be different from your unit test HTML file.
    // Using `false` as the third parameter to open() makes the operation synchronous.
    req.open("get", "shoppingList.html", false);
    req.send();
    $templateCache.put("shoppingList.html", directiveTemplate);
  }));

  it('Replaces the element with the appropriate content', function() {

    //this is the expected data that the directive expects to have passed into it
    var list = {};
    list.items = [
      {name: "item 1", quantity: "1"},
      {name: "item 2", quantity: "2"}
    ];
    //give the list to the rootscope
    $rootScope.list = list;

    // Compile a piece of HTML containing the directive; it expects my-list to be set to list and a string that is set on the title attribute
    var html = "<shopping-list my-list='list' title='test title'></shopping-list>"
    //compile the html, returns a function and give that function the $rootScope that has the data it will need for the directive
    //element below ends up being the directive compiled with the data it needs
    var element = $compile(html)($rootScope);

    // fire all the watches, so the scope expressions will be evaluated; will also insert the data into the html
    $rootScope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html().replace(/\s/g, '')).toContain(expectedHtml);
  });
});
