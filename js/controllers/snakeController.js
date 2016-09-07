snakeApp.controller('snakeController',
    function snakeController($scope) {

        $scope.play = function (check) {
            $scope.playGa = !!check;
        };

    }


);