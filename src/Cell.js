import Point from "./Point.js";
export default class Cell extends Point {
    constructor(x, y, z) {
        super(x, y, z);
        this.directions = [0, 1, 2, 3, 4, 5];
        this.shuffle(this.directions);
        this.walls = [1, 1, 1, 1, 1, 1];
    }
    shuffle(array) {
        for (let i = array.length; i > 0; i -= 1) {
            array.push(array.splice(Math.floor(Math.random() * i), 1)[0]);
        }
        return array;
    }
    get isOpen() {
        return this.directions.length < 6;
    }
    toString() {
        return this.walls.join("");
    }
    get dom() {
        var folder = "images/petit";
        var dx = 64;
        var dy = 32;
        // var dd = 4;
        var dd = 2;
        // var folder = "images/minuscule";
        // var dx = 32;
        // var dy = 16;
        if (!this._dom) {
            var span = document.createElement("span");
            var img = span.appendChild(document.createElement("img"));
            img.setAttribute("src", folder+"/floor_E.png");
            img.style.position = "absolute";
            if (this.walls[0]) {
                var img = span.appendChild(document.createElement("img"));
                img.setAttribute("src", folder+"/wall_E.png");
                img.style.position = "absolute";
                img.style.marginTop = (-7*dd)+"px"
                img.style.marginLeft = (4*dd)+"px";
            }
            if (this.walls[4]) {
                var img = span.appendChild(document.createElement("img"));
                img.setAttribute("src", folder+"/wall_N.png");
                img.style.position = "absolute";
                img.style.marginTop = (-7*dd)+"px"
                img.style.marginLeft = (-4*dd)+"px";
            }
            if (this.walls[1]) {
                var img = span.appendChild(document.createElement("img"));
                img.setAttribute("src", folder+"/wall_S.png");
                img.style.position = "absolute";
                img.style.marginTop = (-3*dd)+"px"
                img.style.marginLeft = (4*dd)+"px";
            }
            if (this.walls[3]) {
                var img = span.appendChild(document.createElement("img"));
                img.setAttribute("src", folder+"/wall_W.png");
                img.style.position = "absolute";
                img.style.marginTop = (-3*dd)+"px"
                img.style.marginLeft = (-4*dd)+"px";
            }
            span.style.position = "absolute";
            span.style.top = (-this.x + this.y) * dy + "px";
            span.style.left = (this.x + this.y) * dx + "px";
            span.style.zIndex = -this.x;
            this._dom = span;
            span.obj = this;
        }
        return this._dom
    }
}