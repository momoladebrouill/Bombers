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
const dummy = document.getElementById("dummy")
class Table {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.list = [];
        let div = document.getElementById("jean");
        for (let i = 0; i < 100; i++) {
            div.innerHTML += "<button id='" + i + "' class='bigleu' oncontextmenu='return boom(this);'></button>";
        }
        this.buts = document.getElementsByClassName("bigleu");
        for (let i = 0; i < this.buts.length; i++) {
            if (i % this.width == 0) {
                this.list.push([]);
            }

            this.list[this.list.length - 1].push(
                [this.buts[i], "COOL"]);
            this.buts[i].addEventListener("click", onclick);
        }
    }
    get(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return dummy; };
        return this.list[x][y][0];
    }
    getValue(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return 0; };
        return this.list[x][y][1];
    }
    setValue(x, y, value) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return; };
        this.list[x][y][1] = value;
    }
}

function calcat(x, y) {
    let sum = 0;
    for (const elem of euclide) {
        sum += t.getValue(x + elem[0], y + elem[1]) == "NOP";
    }
    return sum;
};
let id;
let pos;

function onclick(e) {
    id = parseInt(e.target.id);
    pos = [parseInt(id / t.height), id % t.width]
    if (t.getValue(pos[0], pos[1]) == "NOP") {
        alert("NO YOU CAN'T DO THAT YA ROBI");
        return;
    }
    dig(pos[0], pos[1]);

}
let but;

function dig(x, y) {
    if (!(x < 0 || x >= t.width || y < 0 || y >= t.height)) {
        if (calcat(x, y) >= 0) {
            but = t.get(x, y);
            but.style.backgroundColor = "white";
            but.textContent = calcat(x, y) == 0 ? "" : calcat(x, y);
        }
        if (calcat(x, y) == 0) {
            for (const elem of euclide) {
                if (t.get(x + elem[0], y + elem[1]).style.backgroundColor != "white" &&
                    t.getValue(x + elem[0], y + elem[1]) == "COOL") {
                    dig(x + elem[0], y + elem[1]);
                }
            }
        }
    }
}

function boom(but) {
    but.textContent = "🚩";
    but.style.backgroundColor = "white";
    return false;
}

t = new Table();
for (let i = 0; i < 10; i++) {
    t.setValue(parseInt(Math.random() * t.width), parseInt(Math.random() * t.height), "NOP");
}