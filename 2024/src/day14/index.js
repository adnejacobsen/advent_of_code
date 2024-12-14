import { Day } from "../utils.js";

class Day14 extends Day {
    constructor() {
        super(14);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            let [p, v] = line.replace(/p|\=|v/g, "").split(" ");
            let [x, y] = p.split(",").map((n) => parseInt(n));
            let [xDir, yDir] = v.split(",").map((n) => parseInt(n));

            return { x, y, xDir, yDir };
        });
    }

    #updateRobots(robots, width, height) {
        let map = {};

        for (let robot of robots) {
            robot.x += robot.xDir;
            robot.y += robot.yDir;

            if (robot.x >= width) {
                robot.x = robot.x - width;
            } else if (robot.x < 0) {
                robot.x = robot.x + width;
            }

            if (robot.y >= height) {
                robot.y = robot.y - height;
            } else if (robot.y < 0) {
                robot.y = robot.y + height;
            }

            if (!map[robot.y]) {
                map[robot.y] = {};
            }

            map[robot.y][robot.x] = (map[robot.y][robot.x] || 0) + 1;
        }

        return map;
    }

    partOne(robots) {
        let width = 101;
        let height = 103;

        for (let s = 0; s < 100; s++) {
            this.#updateRobots(robots, width, height);
        }

        let middleX = Math.floor(width / 2);
        let middleY = Math.floor(height / 2);
        let quads = [0, 0, 0, 0];

        for (let robot of robots) {
            if (robot.x < middleX) {
                if (robot.y < middleY) {
                    quads[0] += 1;
                } else if (robot.y > middleY) {
                    quads[1] += 1;
                }
            } else if (robot.x > middleX) {
                if (robot.y < middleY) {
                    quads[2] += 1;
                } else if (robot.y > middleY) {
                    quads[3] += 1;
                }
            }
        }

        return quads.reduce((prev, curr) => prev * curr);
    }

    partTwo(robots) {
        let width = 101;
        let height = 103;
        let done = false;
        let seconds = 0;

        while (!done) {
            let map = this.#updateRobots(robots, width, height);

            // if 10 robots in a row, assume christmas tree..
            done = Object.values(map).some((y) => {
                return Object.keys(y).some((x) => {
                    for (let i = 1; i <= 9; i++) {
                        if (!y[parseInt(x) + i]) {
                            return false;
                        }
                    }

                    return true;
                });
            });

            seconds += 1;
        }

        return seconds;
    }
}

new Day14().solve();
