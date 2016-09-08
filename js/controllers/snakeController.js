snakeApp.controller('snakeController', ['$scope', '$interval', 'snakeService',
    function ($scope, $interval, snakeService) {

        $scope.snake = snakeService.snake;

        var play;
        $scope.play = function () {

            if ($scope.snake.parts.length == 0) $scope.snake._startCreate();

            if ( angular.isDefined(play) ) return;

            play = $interval(function () {
                $scope.snake.move();
            }, 300);
        };

        $scope.stop = function () {
            if ( angular.isDefined(play)) {
                $interval.cancel(play);
                play = undefined;
                $scope.snake.parts.length = 0;
            }
        };

        $scope.arrowDown = function (clickEvent) {
           $scope.snake.whereGoing(clickEvent.keyCode);
        }

    }]);