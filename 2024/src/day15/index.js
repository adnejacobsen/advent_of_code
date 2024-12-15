import { Day } from "../utils.js";

class Day15 extends Day {
    #dirs = {
        "<": [-1, 0],
        "^": [0, -1],
        ">": [1, 0],
        v: [0, 1],
    };

    constructor() {
        super(15);
    }

    preprocess(text) {
        let [map, moves] = text.split("\n\n");

        return {
            map: map.split("\n").map((line) => line.split("")),
            moves: moves.replaceAll("\n", "").split(""),
        };
    }

    #move(map, x, y, xDir, yDir) {
        let nx = x + xDir;
        let ny = y + yDir;
        let n = map[ny][nx];

        if (n === "#") {
            return false;
        } else if (n === ".") {
            map[ny][nx] = map[y][x];
            map[y][x] = ".";
        } else if (n === "O") {
            let moved = this.#move(map, nx, ny, xDir, yDir);

            if (moved) {
                this.#move(map, x, y, xDir, yDir);
            } else {
                return false;
            }
        }

        return true;
    }

    #getSum(map, box) {
        let sum = 0;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[y][x] === box) {
                    sum += 100 * y + x;
                }
            }
        }

        return sum;
    }

    partOne({ map, moves }) {
        let y = map.findIndex((x) => x.includes("@"));
        let x = map[y].findIndex((x) => x === "@");

        for (let move of moves) {
            let [xDir, yDir] = this.#dirs[move];
            let moved = this.#move(map, x, y, xDir, yDir);

            if (moved) {
                x += xDir;
                y += yDir;
            }
        }

        return this.#getSum(map, "O");
    }

    #canMove(map, x, y, xDir, yDir, res = []) {
        let nx = x + xDir;
        let ny = y + yDir;
        let n = map[ny][nx];
        let newRes = [...res];

        if (n === "#") {
            newRes.push(false);
        } else if (n === ".") {
            newRes.push(true);
        } else if (["[", "]"].includes(n)) {
            if (xDir !== 0) {
                newRes.push(this.#canMove(map, nx, ny, xDir, yDir, newRes));
            } else {
                let leftX = n === "[" ? nx : nx - 1;
                let rightX = leftX + 1;

                newRes.push(this.#canMove(map, leftX, ny, xDir, yDir, newRes));
                newRes.push(this.#canMove(map, rightX, ny, xDir, yDir, newRes));
            }
        }

        return !newRes.some((n) => !n);
    }

    #move2(map, x, y, xDir, yDir) {
        let nx = x + xDir;
        let ny = y + yDir;
        let n = map[ny][nx];

        if (["[", "]"].includes(n)) {
            if (xDir !== 0) {
                this.#move2(map, nx, ny, xDir, yDir);
                this.#move2(map, x, y, xDir, yDir);
            } else {
                let leftX = n === "[" ? nx : nx - 1;
                let rightX = leftX + 1;

                this.#move2(map, leftX, ny, xDir, yDir);
                this.#move2(map, rightX, ny, xDir, yDir);
                this.#move2(map, x, y, xDir, yDir);
            }
        } else if (n === ".") {
            map[ny][nx] = map[y][x];
            map[y][x] = ".";
        }
    }

    partTwo({ map, moves }) {
        let newMap = [];

        for (let y = 0; y < map.length; y++) {
            let newY = [];

            for (let x = 0; x < map[0].length; x++) {
                let c = map[y][x];

                if (c === "#") {
                    newY.push(...["#", "#"]);
                } else if (c === "O") {
                    newY.push(...["[", "]"]);
                } else if (c === ".") {
                    newY.push(...[".", "."]);
                } else if (c === "@") {
                    newY.push(...["@", "."]);
                }
            }

            newMap.push(newY);
        }

        let y = newMap.findIndex((x) => x.includes("@"));
        let x = newMap[y].findIndex((x) => x === "@");

        for (let move of moves) {
            let [xDir, yDir] = this.#dirs[move];

            if (this.#canMove(newMap, x, y, xDir, yDir)) {
                this.#move2(newMap, x, y, xDir, yDir);
                x += xDir;
                y += yDir;
            }
        }

        return this.#getSum(newMap, "[");
    }
}

new Day15().solve();
