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
                    this.cells[z][y][x] = new Cell(x, y, z);
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
                if (!newCell) {
                    cursor.backward();
                } else if (newCell.isOpen) {
                    newCell.directions = newCell.directions.filter(dir => dir !== (cursor.dir+3)%6);
                    cursor.backward();
                } else {
                    newCell.directions = newCell.directions.filter(dir => dir !== (cursor.dir+3)%6);
                    cell.walls[cursor.dir] = 0;
                    cursor.steps[0].walls[(cursor.dir+3)%6] = 0;
                    cell = newCell;
                }
            }
            cursor.steps.shift();
        }
    }
    ascii(floor) {
        // w0=S; w1=E; w2=U; w3=N; w4=W; w5=D
        //          "0123456789abcdef"
        var corners="0000║╠0╦╝╣╩╬";
        var choix = ["╔═╗","║ ║","╚═╝"];
        floor=this.cells[floor];
        var result = []
        for (let y = 0; y < this.depth; y += 1) {
            result[y*3] = [];
            result[y*3+1] = [];
            result[y*3+2] = [];
            for (let x = 0; x < this.width; x += 1) {
                let cell = floor[y][x];
                console.log(cell.walls);
                result[y*3][x*3] = "+";
                result[y*3][x*3+2] = "+";
                result[y*3+2][x*3] = "+";
                result[y*3+2][x*3+2] = "+";
                result[y*3][x*3+1] = floor[y][x].walls[0] == 1 ? "-" : " ";
                result[y*3+1][x*3] = floor[y][x].walls[1] == 1 ? "|" : " ";
                result[y*3][x*3+2] = floor[y][x].walls[3] == 1 ? "-" : " ";
                result[y*3+2][x*3] = floor[y][x].walls[4] == 1 ? "|" : " ";
                result[y*3+1][x*3+1] = "x";
            }
            result[y*3] = result[y*3].join("");
            result[y*3+1] = result[y*3+1].join("");
            result[y*3+2] = result[y*3+2].join("");
        }
        result = result.join("\r\n");
        return result;
    }
    display(element, floor=0) {
        floor=this.cells[floor];
        element = document.body.querySelector(element);
        for (let y = 0; y < this.depth; y += 1) {
            let row = element.appendChild(document.createElement("div"));
            for (let x = 0; x < this.width; x += 1) {
                row.appendChild(floor[y][x].dom);
                console.log(floor[y][x]);
            }
        }

    }
    toString() {
        return this.cells;
    }
}