import { Day } from "../utils.js";

class Day8 extends Day {
    constructor() {
        super(8);
    }

    preprocess(text) {
        let map = text.split("\n").map((line) => line.split(""));
        let antennas = {};

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                let c = map[y][x];

                if (c !== ".") {
                    antennas[c] = [...(antennas[c] || []), [x, y]];
                }
            }
        }

        return { map, antennas };
    }

    partOne({ map, antennas }) {
        let antinodes = new Set();

        for (let coo of Object.values(antennas)) {
            for (let [x1, y1] of coo) {
                for (let [x2, y2] of coo) {
                    if (x1 === x2 && y1 === y2) continue;

                    let x3 = x2 + (x2 - x1);
                    let y3 = y2 + (y2 - y1);

                    if (map?.[y3]?.[x3]) {
                        antinodes.add(`${x3},${y3}`);
                    }
                }
            }
        }

        return antinodes.size;
    }

    partTwo({ map, antennas }) {
        let antinodes = new Set();

        for (let coo of Object.values(antennas)) {
            for (let [x1, y1] of coo) {
                antinodes.add(`${x1},${y1}`);

                for (let [x2, y2] of coo) {
                    if (x1 === x2 && y1 === y2) continue;

                    let xVec = x2 - x1;
                    let yVec = y2 - y1;
                    let x3 = x2 + xVec;
                    let y3 = y2 + yVec;

                    while (map?.[y3]?.[x3]) {
                        antinodes.add(`${x3},${y3}`);
                        x3 += xVec;
                        y3 += yVec;
                    }
                }
            }
        }

        return antinodes.size;
    }
}

new Day8().solve();
