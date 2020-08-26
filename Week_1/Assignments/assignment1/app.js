(function(){
    'use strict';

    angular.module('solution1',[])
    .controller('solution1Controller', solution1Controller);

    solution1Controller.$inject = ['$scope'];
    
    function solution1Controller($scope){
        $scope.lunchList;
        $scope.message = {};
        let lunchListcount = 0;
        
        //empty items not considered i.e, '' or ' '
        function countLunchList(lunchList) {
            if (lunchList){
                let lunchListArr = lunchList.split(',').filter(el => {return el != '' && el != ' '});
                console.log(lunchListArr)
                return lunchListArr.length;
            } else {
                return 0;
            }
        };

        $scope.checkIfTooMuch = function(){
            
            lunchListcount = countLunchList($scope.lunchList);

            console.log(lunchListcount);
            if (lunchListcount <= 3 && lunchListcount > 0){
                $scope.message.message = "Enjoy!";
                $scope.message.noData = false;
            } else if (lunchListcount < 1){
                $scope.message.message = "Please enter data first"
                $scope.message.noData = true;
            } else {
                $scope.message.message = "Too much!!"
                $scope.message.noData = false;
            }
        };
    };
})();