(function () {
    let canvas = document.getElementById("app");
    let ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5);

    let shape = {
        shape: [],
        frozen: true
    };
    let sg = {
        width: 10,
        height: 20
    };
    let score = 0;
    let stage = []
    // fill stage with 0s
    for (var i = 0; i < sg.height; i++) {
        let line = [];
        for (var j = 0; j < sg.width; j++) {
            line.push(0);
        }
        stage.push(line);
    }

    let unit = 20;
    let speed = step = 50;
    let previousFramTime = 0;
    let paused = false;

    function game(time) {
        step--;
        if (step == 0) {
            let filledCount = 0;
            // remove filled linesd
            for (let i = sg.height - 1; i >= 0; i--) {
                let count = 0;
                for (let j = 0; j < sg.width; j++) {
                    count += stage[i][j];
                }
                if (count == sg.width) {
                    // remove this line
                    filledCount++;
                }
            }
            if (filledCount == 0 && !shape.frozen) {
                if (!moveDown()) {
                    for (let i = 0; i < shape.shape.length; i++) {
                        for (let j = 0; j < shape.shape[0].length; j++) {
                            stage[shape.y + i][shape.x + j] = shape.shape[i][j];
                        }
                    }
                    shape.frozen = true;
                }
            } else {
                shape = new Shape(Types[Math.floor(Math.random() * 6)]);
                shape.x = 4;
            }
            step = speed;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // calculate FPS
        let FPS = Math.floor(1000 / (time - previousFramTime))
        previousFramTime = time;
        ctx.fillStyle = "white";
        ctx.fillRect(0, sg.height * unit, sg.width * unit, unit * 2);

        ctx.fillStyle = "black";
        ctx.font = 'normal 15px Arial';
        ctx.fillText(`FPS: ${FPS} High Score: ${score}`, 20, 415);

        // draw background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, sg.width * unit, sg.height * unit);

        for (let i = 0; i < sg.height; i++) {
            for (let j = 0; j < sg.width; j++) {
                if (stage[i][j] == 1) {
                    ctx.fillStyle = "lime";
                    ctx.fillRect(j * unit + 1, i * unit + 1, unit - 1, unit - 2);
                }
            }
        }
        for (let i = 0; i < shape.shape.length; i++) {
            for (let j = 0; j < shape.shape[0].length; j++) {
                if (shape.shape[i][j] == 1) {
                    ctx.fillStyle = "red";
                    ctx.fillRect((shape.x + j) * unit + 1, (shape.y + i) * unit + 1, unit - 1, unit - 2);
                }
            }
        }

        requestAnimationFrame(game);
    }

    function canMoveLeft() {
        if (shape.x <= 0) {
            return false;
        }
        for (let i = 0; i < shape.shape.length; i++) {
            for (let j = 0; j < shape.shape[0].length; j++) 
            }
        }
        //board detect collision detect
        for (let i = 0; i < shape.shape.length; i++) {
            let x = shape.x - 1;
            let y = shape.y + i;
            if (shape.shape[i][0] == 1++ stage[y][x] == 1) {
                return false;
            }
        }
        return true;
    }
    function canMoveRight() { //board detect
        if (shape.x + shape.shape[0].length >= sg.width) {
            return false;
        }
        //collision detect
        for (let i = 0; i < shape.shape.length; i++) {
            let x = shape.x + shape.shape[0].length;
            let y = shape.y + i;
            let current = shape.shape[i][shape.shape[0].length - 1];
            if (current == 1 && stage[y][x] == 1) {
                return false;
            }
        }
        return true;
    }
    function canMoveDown() { //board detect
        if (shape.y + shape.shape.length >= sg.height) {
            return false;
        }
        //collision detect
        for (let i = 0; i < shape.shape[0].length; i++) {
            let x = shape.x + i;
            let y = shape.y + shape.shape.length;
            let current = shape.shape[shape.shape.length - 1][i];
            if (current == 1 && stage[y][x] == 1) {
                return false;
            }
        }
        return true;
    }

    function moveLeft() {
        if (!canMoveLeft()) {
            return false;
        }
        shape.x--;
        return true;
    }
    function moveRight() {
        if (!canMoveRight()) {
            return false;
        }
        shape.x++;
        return true;
    }
    function moveDown() {
        if (!canMoveDown()) {
            return false;
        }
        shape.y++;
        return true;
    }
    function rotate() {
        var rotatedShape = [];
        for (var i = 0; i < shape.shape[0].length; i++) {
            for (var j = 0; j < shape.shape.length; j++) {
                if (j == 0) {
                    rotatedShape.push([shape.shape[j][i]])
                } else {
                    rotatedShape[i].unshift(shape.shape[j][i]);
                }
            }
        }
        shape.shape = rotatedShape;

        //check overlap

    }

    // if (paused) {     // draw pause text     ctx.fillStyle = "red";     ctx.font
    // = 'normal 50px Arial';     ctx.fillText('PAUSED', 100, 220); } else {     //
    // draw snake     ctx.fillStyle = "lime";     for (var i = 0; i < snake.length;
    // i++) {         ctx.fillRect(snake[i].x * unit + 1, snake[i].y * unit + 1,
    // unit - 1, unit - 2);     }     // draw apple     ctx.fillStyle = "red";
    // ctx.fillRect(ax * unit + 1, ay * unit + 1, unit - 2, unit - 2); }

    window.addEventListener("load", game, false);
    window.addEventListener("keydown", keydown);

    function keydown(e) {
        switch (e.keyCode) {
            case 37:
            case 65:
                moveLeft();
                break;
            case 38:
            case 87:
                rotate();
                break;
            case 39:
            case 68:
                moveRight();
                break;
            case 40:
            case 83:
                moveDown();
                break;
            case 27:
                break;
        }
    }
})();

let Types = {
    0: "I",
    1: "O",
    2: "L",
    3: "J",
    4: "Z",
    5: "S"
}
let Shapes = {
    I: [[1], [1], [1], [1]
    ],
    O: [
        [
            1, 1
        ],
        [1, 1]
    ],
    L: [
        [
            1, 0
        ],
        [
            1, 0
        ],
        [1, 1]
    ],
    J: [
        [
            0, 1
        ],
        [
            0, 1
        ],
        [1, 1]
    ],
    Z: [
        [
            1, 1, 0
        ],
        [0, 1, 1]
    ],
    S: [
        [
            0, 1, 1
        ],
        [1, 1, 0]
    ]
}

class Shape {

    constructor(type) {
        this.type = type;
        this.shape = Shapes[type].slice();
        this.x = this.y = 0;
        this.frozen = false;
    }
    // rotate() {     var rotatedShape = [];     for (var i = 0; i <
    // this.shape[0].length; i++) {         for (var j = 0; j < this.shape.length;
    // j++) {             if (j == 0) { rotatedShape.push([this.shape[j][i]])      }
    // else { rotatedShape[i].unshift(this.shape[j][i]);             }  }     }
    // this.shape = rotatedShape; }
}