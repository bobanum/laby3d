import Point from "./Point.js";

export default class Cursor extends Point {
    constructor(laby) {
        super(0, 0, 0);
        this.dir = 0; //[esuwnd]
        this.steps = [];
        this.laby = laby;
    }
    moveTo(pt) {
        this.x = pt.x;
        this.y = pt.y;
        this.z = pt.z;
        this.steps.unshift(this.laby.cell(this));
        return this;        
    }
    forward () {
        this.set(this.add(this.directions[this.dir]));
        this.steps.unshift(this.laby.cell(this));
    }
    backward () {
        this.set(this.subtract(this.directions[this.dir]));
        this.steps.shift();
    }
    toString() {
        return "("+x+","+y+","+z+")";
    }
    static init() {
        this.prototype.directions = [
            new Point(1,0,0),
            new Point(0,1,0),
            new Point(0,0,1),
            new Point(-1,0,0),
            new Point(0,-1,0),
            new Point(0,0,-1),
        ]
    }
}
Cursor.init();