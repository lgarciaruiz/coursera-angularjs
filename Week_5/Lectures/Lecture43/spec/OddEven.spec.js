describe("OddEvenGenerator", function() {
  var randomNumGenerator8;
  var randomNumGenerator3;

  beforeEach(function() {
    randomNumGenerator8 = function(to, from) {
      //faking response to return 8
      return 8;
    };
    randomNumGenerator3 = function(to, from) {
      //faking response to return 3
      return 3;
    };

  });

  it("should produce an odd number", function() {
    var result = getRandomOddOrEven1to10("odd", randomNumGenerator3);
    expect(result).toEqual(3);
  });

  //adding x in front of it will disable the test and it will not run; x can also be added to the describe method and it will disable all tests in this describe method
  xit("should produce an even number", function() {
    var result = getRandomOddOrEven1to10("even", randomNumGenerator8);
    expect(result).toEqual(8);
  });
});
