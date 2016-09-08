/**
 * Created by a on 07.09.16.
 */
snakeApp.factory ('snakeService', function (){

    return {
        snake: {
            parts: [],

            _startCreate: function () {
                this.parts.push({id: 0, x: 81, y: 153});
                for (var i=1; i<4; i++){
                    this.parts.push({id: i, x: this.parts[i-1].x-9, y: this.parts[i-1].y});
                }
                },

            aLive: function () {
                return !!this.parts.length;
            },

            move: function () {
                var tempX = [], tempY = [];
                for (var i = 0; i<this.parts.length; i++) {
                    tempX[0] = this.parts[i].x;
                    tempY[0] = this.parts[i].y;

                    if (i == 0) {
                        switch (this.direct){
                            case 119: this.parts[i].y -=9; // вниз
                                break;
                            case 100: this.parts[i].x +=9; // право
                                break;
                            case 97: this.parts[i].x -=9; // лево
                                break;
                            case 115: this.parts[i].y +=9; //вверх
                                break;
                            default : break;
                        }
                        tempX [1] = tempX [0];
                        tempY [1] = tempY [0];
                        continue;
                    }

                    this.parts[i].x = tempX[1];
                    this.parts[i].y = tempY[1];

                    tempX [1] = tempX [0];
                    tempY [1] = tempY [0];
                }
            },

            direct: 100,
            whereGoing: function (keyPress) {
                switch (keyPress) {
                    case 119: this.direct = 119; //вниз
                        break;
                    case 100: this.direct = 100; // право
                        break;
                    case 97: this.direct = 97; // лево
                        break;
                    case 115: this.direct = 115; //вверх
                        break;
                    default : break;
                }
            },

            foodParams: [],
            foodCreate: function () {
                var X, Y;

                while (true) {
                    X = this.randomValue(0,216);
                    if (X % 9 == 0) {
                        while (true) {
                            Y = this.randomValue(0,216);
                            if (Y % 9 == 0) {
                                break;
                            }
                        }
                        if (!this.checkConnection(X,Y)) break;
                    }
                }

                if (this.aLive()) {
                    this.foodParams[0] = { color: 'red', x: X,
                        y: Y};
                }
            },

            foodDelete: function () {
                this.foodParams[0].color = 'white';
            },

            eatenFood: function () {
                return this.checkConnection (this.foodParams[0].x, this.foodParams[0].y);
            },

            growing: function () {
                this.parts.push({id: this.parts.length, x: this.foodParams[0].x, y: this.foodParams[0].y});
            },

            checkConnection: function (x, y) {
                for (var i=0; i<this.parts.length; i++) {
                    if ((x == this.parts[i].x) && (y == this.parts[i].y)) {
                        return true;
                    }
                }
                return false;
            },

            wallConnect: function () {
                return (this.parts[0].x < 0 ||
                        this.parts[0].x > 216 ||
                        this.parts[0].y < 0 ||
                        this.parts[0].y > 216)
            },

            randomValue: function (min, max) {
                var rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(rand);
                return rand;
            }

            /*food: {
                create: function () {
                    //if (this.aLive()) {
                        snake.food.params[0] = { color: '#ff0000', x: 100, //Math.random(0,225),
                            y: 100}; // Math.random(0,225)
                    //}
                },
                del: function () {
                    this.food.params[0].color = '#ffffff';
                },
                params: []
            }*/

            }
        }

});