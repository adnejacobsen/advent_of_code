import { Day } from "../utils.js";

class Day15 extends Day {
    constructor() {
        super(15);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            let xy = /.*x=(.*?), y=(.*?):.*x=(.*?),.y=(.*)/g
                .exec(line)
                .slice(1, 5)
                .map((n) => parseInt(n));

            return {
                sensX: xy[0],
                sensY: xy[1],
                beacX: xy[2],
                beacY: xy[3],
                dist: Math.abs(xy[0] - xy[2]) + Math.abs(xy[1] - xy[3]),
            };
        });
    }

    partOne(input) {
        let y = 2000000;
        let ranges = [];
        let beacs = 0;

        input.forEach(({ sensX, sensY, dist }) => {
            let min = sensY - dist;
            let max = sensY + dist;

            if (y >= min && y <= max) {
                let xDist = dist - Math.abs(sensY - y);
                let xStart = sensX - xDist;
                let xEnd = sensX + xDist;
                ranges.push([xStart, xEnd]);
            }
        });

        let min = Math.min(...ranges.flat());
        let max = Math.max(...ranges.flat());
        let count = 0;

        for (let x = min; x <= max; x++) {
            let exists = ranges.some((range) => {
                return x >= range[0] && x <= range[1];
            });

            let isBeacon = input.some(({ beacX, beacY }) => {
                return beacX === x && beacY === y;
            });

            if (exists && !isBeacon) count++;
        }

        return count - beacs;
    }

    partTwo(input) {
        let max = 4000000;
        let xFree = 0;
        let yFree = 0;

        return null;

        for (let x = 0; x <= max; x++) {
            for (let y = 0; y <= max; y++) {
                let freeSpot = input.every(({ sensX, sensY, dist }) => {
                    let min = sensY - dist;
                    let max = sensY + dist;
                    let isFree = true;

                    if (y >= min && y <= max) {
                        let xDist = dist - Math.abs(sensY - y);
                        let xStart = sensX - xDist;
                        let xEnd = sensX + xDist;

                        if (x >= xStart && x <= xEnd) {
                            isFree = false;
                        }
                    }

                    return isFree;
                });

                if (freeSpot) {
                    xFree = x;
                    yFree = y;
                }
            }
        }

        return xFree * 4000000 + yFree;
    }
}

new Day15().solve();
