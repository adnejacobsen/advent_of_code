import { Day } from "../utils.js";

class Day10 extends Day {
    #dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    constructor() {
        super(10);
    }

    #getPeaks(map, x, y, prevPath = [], prevPaths = {}) {
        let curr = map[y][x];
        let path = [...prevPath, [x, y]];
        let paths = { ...prevPaths };

        for (let [yDir, xDir] of this.#dirs) {
            let xNext = x + xDir;
            let yNext = y + yDir;
            let next = map?.[yNext]?.[xNext];

            if (next === curr + 1) {
                if (next === 9) {
                    let peakId = `${xNext},${yNext}`;
                    paths[peakId] = [
                        ...(paths[peakId] || []),
                        [...path, [xNext, yNext]],
                    ];
                } else {
                    paths = this.#getPeaks(map, xNext, yNext, path, paths);
                }
            }
        }

        return paths;
    }

    preprocess(text) {
        let map = text
            .split("\n")
            .map((line) => line.split("").map((n) => parseInt(n)));

        let paths = {};

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                let n = map[y][x];

                if (n === 0) {
                    let pathId = `${x},${y}`;
                    paths[pathId] = this.#getPeaks(map, x, y);
                }
            }
        }

        return paths;
    }

    partOne(paths) {
        return Object.values(paths).reduce((prev, curr) => {
            return prev + Object.keys(curr).length;
        }, 0);
    }

    partTwo(paths) {
        return Object.values(paths).reduce((prev, curr) => {
            let pathCount = Object.values(curr).reduce((prev, curr) => {
                return prev + curr.length;
            }, 0);

            return prev + pathCount;
        }, 0);
    }
}

new Day10().solve();
