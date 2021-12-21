/*
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const spanScore = document.getElementById("score");
const spanVie = document.getElementById("vie");
var width = window.innerWidth;
var height = window.innerHeight;


function resize() {
    width = window.innerWidth,
        height = window.innerHeight,
        ratio = window.devicePixelRatio;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.scale(ratio, ratio);
}

window.onresize = function() {
    resize();
};

window.onload = function() {
    resize();
};

document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    console.log(e.keyCode);
}, false);

document.addEventListener('keyup', (e) => {
    console.log(e.keyCode);
}, false);
document.onmousedown = function(e) {
    console.log(e.clientX, e.clientY);
}
document.onmouseup = function(e) {
    console.log(e.clientX, e.clientY);
}

function boucle() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = "black";
    context.rect(0, 0, width, height);
    context.fill();
    context.closePath();

    window.requestAnimationFrame(boucle);
}*/
class Table {
    constructor() {
        this.width = 10;
        this.height = 10;
        let div = document.getElementById("jean");
        for (let i = 0; i < 100; i++) {
            div.innerHTML += "<button id='" + i + "' class='bigleu' oncontextmenu='return boom(" + i + ",this);'>" + i + "</button>";
        }
        this.buts = document.getElementsByClassName("bigleu");
        this.list = [];
        let x = 0;
        for (const but of this.buts) {
            if (x % this.width == 0) {
                this.list.push([]);
            }
            x++;
            const bomb = Math.random() > 0.1 ? 0 : 1;
            this.list[this.list.length - 1].push([but, bomb]);
            if (bomb == 1) {
                but.textContent = "💣";
            } else {
                but.textContent = "";
            }
            but.addEventListener("click", onclick);
        }
    }
    get(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return document.getElementById("dummy");
        }
        return this.list[x][y][0];
    }
    getValue(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 0;
        }
        return this.list[x][y][1];
    }
    setValue(x, y, value) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }
        this.list[x][y][1] = value;
    }
}

function calcat(x, y) {
    let sum = 0;
    for (const elem of euclide) {
        sum += t.getValue(x + elem[0], y + elem[1]);
    }
    return sum;
}

function onclick(e) {
    let id = parseInt(e.target.id);
    let but = e.target;
    //but.style.color = "red";
    let pos = [parseInt(id / t.height), id % t.width];
    but.textContent = calcat(pos[0], pos[1]);

}

function dig(x, y) {
    if (!(x < 0 || x >= t.width || y < 0 || y >= t.height)) {
        if (calcat(x, y) >= 0) {
            t.setValue(x, y, 2);
        }
        if (calcat(x, y) == 0) {
            for (elem of euclide) {
                if (t.getValue(x + elem[0], y + elem[1]) == 0) {
                    dig(x + elem[0], y + elem[1]);
                }
            }
        }

    }
}

function boom(id, but) {
    but.textContent = "🚩";
    return false;
}
console.log("Hello World");
t = new Table();
const euclide = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];