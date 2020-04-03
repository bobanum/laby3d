import Cursor from "./Cursor.js";
import Cell from "./Cell.js";
import Point from "./Point.js";

export default class Laby {
    constructor(width, depth, height) {
        this.width = width;
        this.depth = depth;
        this.height = height;
    }
    encloses(pt) {
        return !(pt.x < 0 || pt.y < 0 || pt.z < 0 
            || pt.x >= this.width || pt.y >= this.depth || pt.z >= this.height);
    }
    reset() {
        this.cells = [];
        for (let z = 0; z < this.height; z += 1) {
            this.cells[z] = [];
            for (let y = 0; y < this.depth; y += 1) {
                this.cells[z][y] = [];
                for (let x = 0; x < this.width; x += 1) {
                    this.cells[z][y][x] = new Cell()
                }
            }
        }
    }
    cell(pt) {
        if (!this.encloses(pt)) {
            return false;
        }
        return this.cells[pt.z][pt.y][pt.x];
    }
    generate() {
        this.reset();
        var cursor = new Cursor(this);
        cursor.moveTo(new Point(
            Math.floor(Math.random() * this.width),
            Math.floor(Math.random() * this.depth),
            Math.floor(Math.random() * this.height)
        ));
        while (cursor.steps.length) {
            let cell = cursor.steps[0]
            while (cell.directions.length) {
                cursor.dir = cell.directions.shift();
                cursor.forward();
                let newCell = cursor.steps[0];
                // if (!newCell) {
                //     console.log(this);
                // }
                if (!newCell || newCell.isOpen) {
                    cursor.backward();
                } else {
                    newCell.directions = newCell.directions.filter(dir => dir !== (cursor.dir+3)%6);
                    cell.walls[cursor.dir] = 0;
                    cursor.steps[0].walls[(cursor.dir+3)%6] = 0;
                }
            }
            cursor.steps.shift();
        }
    }
    toString() {
        return this.cells;
    }
}