import { Day } from "../utils.js";

class Day9 extends Day {
    constructor() {
        super(9);
    }

    preprocess(text) {
        const xDirMap = { L: -1, R: 1 };
        const yDirMap = { U: 1, D: -1 };

        return text.split("\n").map((line) => {
            let [dir, step] = line.split(" ");

            return {
                xDir: xDirMap[dir] || 0,
                yDir: yDirMap[dir] || 0,
                xStep: xDirMap[dir] ? parseInt(step) : 0,
                yStep: yDirMap[dir] ? parseInt(step) : 0,
            };
        });
    }

    #moveRope(motions, ropeLength) {
        let rope = [{ x: 0, y: 0 }];
        let visited = {};

        const updateRopePart = (a, b) => {
            let newB = { ...b };

            let isTouching =
                a.x >= newB.x - 1 &&
                a.x <= newB.x + 1 &&
                a.y >= newB.y - 1 &&
                a.y <= newB.y + 1;

            if (!isTouching) {
                newB.x += a.x > newB.x ? 1 : a.x < newB.x ? -1 : 0;
                newB.y += a.y > newB.y ? 1 : a.y < newB.y ? -1 : 0;
            }

            return newB;
        };

        motions.forEach(({ xDir, yDir, xStep, yStep }) => {
            let nx = rope[0].x + xStep * xDir;
            let ny = rope[0].y + yStep * yDir;

            while (rope[0].x !== nx || rope[0].y !== ny) {
                rope[0].x += xDir;
                rope[0].y += yDir;

                for (let t = 1; t < ropeLength; t++) {
                    rope[t] = updateRopePart(
                        rope[t - 1],
                        rope[t] || { x: 0, y: 0 }
                    );
                }

                let tail = rope[ropeLength - 1];
                visited[`${tail.x}-${tail.y}`] = true;
            }
        });

        return Object.keys(visited).length;
    }

    partOne(input) {
        return this.#moveRope(input, 2);
    }

    partTwo(input) {
        return this.#moveRope(input, 10);
    }
}

new Day9().solve();
