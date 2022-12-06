import { Day } from "../utils.js";

class Day9 extends Day {
    constructor() {
        super(9);
    }

    preprocess(text) {
        return text
            .split("\n")
            .map((line) => line.split("").map((n) => parseInt(n)));
    }

    #getAdjecent(map, x, y, border) {
        return [
            map[y - 1] ? map[y - 1][x] : border,
            map[y + 1] ? map[y + 1][x] : border,
            map[y][x - 1] !== undefined ? map[y][x - 1] : border,
            map[y][x + 1] !== undefined ? map[y][x + 1] : border,
        ];
    }

    #getLowPoints(map) {
        let points = [];

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                let v = map[y][x];
                let adjecent = this.#getAdjecent(map, x, y, 9);

                if (adjecent.every((n) => n > v)) {
                    points.push({ x, y, v });
                }
            }
        }

        return points;
    }

    partOne(input) {
        return this.#getLowPoints(input).reduce((prev, curr) => {
            return prev + curr.v + 1;
        }, 0);
    }

    partTwo(input) {
        let lowPoints = this.#getLowPoints(input);

        lowPoints.forEach(({ x, y, z }) => {});
    }
}

new Day9().solve();
