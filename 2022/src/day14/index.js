import { Day } from "../utils.js";

class Day14 extends Day {
    constructor() {
        super(14);
    }

    preprocess(text) {
        let input = text.split("\n").map((line) => {
            return line
                .split(" -> ")
                .map((point) => point.split(",").map((n) => parseInt(n)));
        });

        let rocks = {};
        let xLow = Infinity;
        let xHigh = 0;
        let yHigh = 0;

        input.forEach((line) => {
            line.forEach((start, index) => {
                if (index < line.length - 1) {
                    let end = line[index + 1];
                    let xStart = Math.min(start[0], end[0]);
                    let xEnd = Math.max(start[0], end[0]);
                    let yStart = Math.min(start[1], end[1]);
                    let yEnd = Math.max(start[1], end[1]);

                    for (let y = yStart; y <= yEnd; y++) {
                        if (y > yHigh) yHigh = y;

                        for (let x = xStart; x <= xEnd; x++) {
                            if (x > xHigh) xHigh = x;
                            if (x < xLow) xLow = x;

                            rocks[y] = { ...rocks[y], [x]: "rock" };
                        }
                    }
                }
            });
        });

        return { rocks, xLow, xHigh, yHigh };
    }

    #getSandDir(x, y, world) {
        let xDir = 0;
        let yDir = 0;

        if (!world?.[y + 1]?.[x]) {
            yDir = 1;
        } else if (!world?.[y + 1]?.[x - 1]) {
            yDir = 1;
            xDir = -1;
        } else if (!world?.[y + 1]?.[x + 1]) {
            yDir = 1;
            xDir = 1;
        }

        return { xDir, yDir };
    }

    partOne({ rocks, xLow, xHigh, yHigh }) {
        let sandCount = 0;
        let done = false;
        let world = { ...rocks };

        while (!done) {
            let rest = false;
            let x = 500;
            let y = 0;

            while (!rest && !done) {
                if (!world?.[y + 1]?.[x]) {
                    y += 1;
                } else if (!world?.[y + 1]?.[x - 1]) {
                    y += 1;
                    x -= 1;
                } else if (!world?.[y + 1]?.[x + 1]) {
                    y += 1;
                    x += 1;
                } else {
                    rest = true;
                    sandCount += 1;
                    world[y] = {
                        ...world[y],
                        [x]: "sand",
                    };
                }

                if (x < xLow || x > xHigh || y > yHigh) {
                    done = true;
                }
            }
        }

        return sandCount;
    }

    partTwo({ rocks, yHigh }) {
        let sandCount = 0;
        let done = false;
        let floor = yHigh + 1;
        let world = { ...rocks, [floor]: {} };

        while (!done) {
            let rest = false;
            let x = 500;
            let y = 0;

            while (!rest && !done) {
                if (y < floor) {
                    if (!world?.[y + 1]?.[x]) {
                        y += 1;
                    } else if (!world?.[y + 1]?.[x - 1]) {
                        y += 1;
                        x -= 1;
                    } else if (!world?.[y + 1]?.[x + 1]) {
                        y += 1;
                        x += 1;
                    } else {
                        rest = true;
                    }
                } else {
                    rest = true;
                }

                if (x === 500 && y === 0) {
                    done = true;
                }
            }

            sandCount += 1;
            world[y] = {
                ...world[y],
                [x]: "sand",
            };
        }

        return sandCount;
    }
}

new Day14().solve();
