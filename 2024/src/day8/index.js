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
                    if (!antennas[c]) {
                        antennas[c] = [];
                    }

                    antennas[c].push([x, y]);
                }
            }
        }

        return { map, antennas };
    }

    partOne({ map, antennas }) {
        let antinodes = new Set();

        for (let coo of Object.values(antennas)) {
            for (let i = 0; i < coo.length; i++) {
                let [x1, y1] = coo[i];

                for (let j = 0; j < coo.length; j++) {
                    if (i === j) continue;

                    let [x2, y2] = coo[j];
                    let xVec = x2 - x1;
                    let yVec = y2 - y1;
                    let x3 = x2 + xVec;
                    let y3 = y2 + yVec;

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
            for (let i = 0; i < coo.length; i++) {
                let [x1, y1] = coo[i];

                antinodes.add(`${x1},${y1}`);

                for (let j = 0; j < coo.length; j++) {
                    if (i === j) continue;

                    let [x2, y2] = coo[j];
                    let xVec = x2 - x1;
                    let yVec = y2 - y1;
                    let x3 = x2 + xVec;
                    let y3 = y2 + yVec;

                    let done = false;

                    while (!done) {
                        if (map?.[y3]?.[x3]) {
                            antinodes.add(`${x3},${y3}`);
                        } else {
                            done = true;
                        }

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
