snakeApp.controller('snakeController', ['$rootScope','$scope', '$interval', 'snakeService',
    function ($rootScope, $scope, $interval, snakeService) {

        $scope.snake = snakeService.snake;

        var play;
        $scope.points = 0;
        $scope.play = function () {

            if ($scope.snake.parts.length == 0) $scope.snake._startCreate();

            if ( angular.isDefined(play) ) return;

            play = $interval(function () {
                $scope.snake.move();
                if ($scope.snake.wallConnect()) {
                    $scope.stop();
                }
                if ($scope.snake.eatenFood()) {
                    $scope.snake.growing();
                    $scope.snake.foodCreate();
                    $scope.points +=1;
                }
            }, 300);

            $scope.snake.foodCreate();
        };

        $scope.stop = function () {
            if ( angular.isDefined(play)) {
                $interval.cancel(play);
                play = undefined;
            }
        };

        $scope.reset = function () {
            $scope.stop();
            $scope.snake.parts.length = 0;
            $scope.snake.direct = 100;
            $scope.snake.foodDelete();
        };

        $scope.arrowDown = function (clickEvent) {
           $scope.snake.whereGoing(clickEvent.keyCode);
        }

    }]);