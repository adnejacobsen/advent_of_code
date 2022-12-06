import { Day } from "../utils.js";

class Day5 extends Day {
    constructor() {
        super(5);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            return line
                .split(" -> ")
                .map((xy) => xy.split(",").map((n) => parseInt(n)))
                .sort((a, b) => a[0] - b[0]);
        });
    }

    #addPoint(grid, x, y) {
        grid[y] = grid[y] || [];
        grid[y][x] = (grid[y][x] || 0) + 1;
    }

    #addVertical(grid, x, y1, y2) {
        for (let y = y1; y <= y2; y++) {
            this.#addPoint(grid, x, y);
        }
    }

    #addHorizontal(grid, y, x1, x2) {
        for (let x = x1; x <= x2; x++) {
            this.#addPoint(grid, x, y);
        }
    }

    #addDiagonal(grid, p1, p2) {
        let slope = (p2[1] - p1[1]) / (p2[0] - p1[0]);
        let offset = p1[1] - p1[0] * slope;

        for (let x = p1[0]; x <= p2[0]; x++) {
            let y = offset + x * slope;
            this.#addPoint(grid, x, y);
        }
    }

    #countIntersections(floor) {
        return floor
            .flat()
            .reduce((prev, curr) => prev + (curr > 1 ? 1 : 0), 0);
    }

    partOne(input) {
        let floor = [];

        input.forEach(([p1, p2]) => {
            if (p1[0] === p2[0]) {
                let [y1, y2] = [p1[1], p2[1]].sort((a, b) => a - b);
                this.#addVertical(floor, p1[0], y1, y2);
            } else if (p1[1] === p2[1]) {
                this.#addHorizontal(floor, p1[1], p1[0], p2[0]);
            }
        });

        return this.#countIntersections(floor);
    }

    partTwo(input) {
        let floor = [];

        input.forEach(([p1, p2]) => {
            if (p1[0] === p2[0]) {
                let [y1, y2] = [p1[1], p2[1]].sort((a, b) => a - b);
                this.#addVertical(floor, p1[0], y1, y2);
            } else if (p1[1] === p2[1]) {
                this.#addHorizontal(floor, p1[1], p1[0], p2[0]);
            } else {
                this.#addDiagonal(floor, p1, p2);
            }
        });

        return this.#countIntersections(floor);
    }
}

new Day5().solve();
