export default class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(pt) {
        this.x = pt.x;
        this.y = pt.y;
        this.z = pt.z; 
        return this;       
    }
    add(pt) {
        this.x += pt.x;
        this.y += pt.y;
        this.z += pt.z;
        return this;
    }
    sum(pt) {
        return new Point(
            this.x + pt.x,
            this.y + pt.y,
            this.z + pt.z
        );
    }
    subtract(pt) {
        this.x -= pt.x;
        this.y -= pt.y;
        this.z -= pt.z;
        return this;
    }
    difference(pt) {
        return new Point(
            this.x - pt.x,
            this.y - pt.y,
            this.z - pt.z
        );
    }
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    isInside(w, d, h) {
        return this.x < 0 || this.y < 0 || this.z < 0 
            || this.x >= w || this.y >= d || this.z >= h;
    }
    toString() {
        return "("+x+","+y+","+z+")";
    }
}