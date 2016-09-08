/**
 * Created by a on 07.09.16.
 */
snakeApp.factory ('snakeService', function (){

    return {
        snake: {
            parts: [],

            _startCreate: function () {
                this.parts.push({id: 0, x: 80, y: 80});
                for (var i=1; i<4; i++){
                    this.parts.push({id: i, x: this.parts[i-1].x+15, y: this.parts[i-1].y});
                }
                },

            move: function () {
                var tempX = [], tempY = [];
                for (var i = 0; i<this.parts.length; i++) {
                    tempX[0] = this.parts[i].x;
                    tempY[0] = this.parts[i].y;

                    if (i == 0) {
                        switch (this.direct){
                            case 119: this.parts[i].y -=10; // вверх
                                break;
                            case 100: this.parts[i].x +=10; // право
                                break;
                            case 97: this.parts[i].x -=10; // лево
                                break;
                            case 115: this.parts[i].y +=10; //вниз
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

            whereGoing: function (keyPress) {
                switch (keyPress) {
                    case 119: this.direct = 119; //вверх
                        break;
                    case 100: this.direct = 100; // право
                        break;
                    case 97: this.direct = 97; // лево
                        break;
                    case 115: this.direct = 115; //вниз
                        break;
                    default : break;
                }
            },

            direct: 100

            }
        }

});