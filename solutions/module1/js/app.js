(function () {

    var app = angular.module('LunchCheck', []);

    app.controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {

        $scope.dishes = "";
        $scope.empty = false;
        $scope.message = "";

        $scope.checkItems = function() {
            if ($scope.dishes.trim().length == 0) {
                $scope.empty = true;
                $scope.message = "";
            } else {
                $scope.empty = false;
                if (dishCount() <= 3) {
                    $scope.message = "Enjoy!"
                } else {
                    $scope.message = "Too much!"
                }
            }
        };

        function dishCount() {
            return $scope.dishes.split(",").length
        }
    }

})();