export default class Cell {
    constructor(x, y, z) {
        this.directions = [0,1,2,3,4,5];
        this.shuffle(this.directions);
        this.walls = [1,1,1,1,1,1];
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
}