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
        const getV = (vx, vy) => {
            if (
                vy < 0 ||
                vx < 0 ||
                vy > map.length - 1 ||
                vx > map[0].length - 1
            ) {
                return border;
            }

            return map[vy][vx];
        };

        const adjecent = [];

        [y - 1, y + 1].forEach((ny) => {
            adjecent.push({ x: x, y: ny, v: getV(x, ny) });
        });

        [x - 1, x + 1].forEach((nx) => {
            adjecent.push({ x: nx, y: y, v: getV(nx, y) });
        });

        return adjecent;
    }

    #getLowPoints(map) {
        let points = [];

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                let v = map[y][x];
                let adjecent = this.#getAdjecent(map, x, y, 9);

                if (adjecent.every((n) => n.v > v)) {
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
        const getBasin = (map, point) => {
            let adjecent = this.#getAdjecent(map, point.x, point.y, 9);
            let basin = [point];

            adjecent.forEach((a) => {
                if (a.v > point.v && a.v < 9) {
                    basin.push(...getBasin(map, a));
                }
            });

            return [...new Map(basin.map((i) => [`${i.x}${i.y}`, i])).values()];
        };

        return this.#getLowPoints(input)
            .map((lowPoint) => getBasin(input, lowPoint).length)
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((a, b) => a * b);
    }
}

new Day9().solve();
