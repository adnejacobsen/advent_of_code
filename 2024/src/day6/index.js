import { Day } from "../utils.js";

class Day6 extends Day {
    #guardMap = {
        "^": {
            dirs: [0, -1],
            turn: ">",
        },
        ">": {
            dirs: [1, 0],
            turn: "v",
        },
        v: {
            dirs: [0, 1],
            turn: "<",
        },
        "<": {
            dirs: [-1, 0],
            turn: "^",
        },
    };

    constructor() {
        super(6);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(""));
    }

    #getGuardPos(input) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                if (this.#guardMap[input[y][x]]) {
                    return [x, y];
                }
            }
        }
    }

    #getGuardPath(input) {
        let [x, y] = this.#getGuardPos(input);
        let guard = input[y][x];
        let path = [[x, y]];
        let turns = {};
        let loop = false;
        let done = false;

        while (!done) {
            let [xDir, yDir] = this.#guardMap[guard].dirs;
            let xNext = x + xDir;
            let yNext = y + yDir;
            let cNext = input?.[yNext]?.[xNext];

            if (!cNext) {
                done = true;
            } else if (cNext === "#") {
                let turnId = `${x},${y},${xDir},${yDir}`;
                turns[turnId] = (turns[turnId] || 0) + 1;

                if (turns[turnId] === 2) {
                    loop = true;
                    done = true;
                }

                guard = this.#guardMap[guard].turn;
            } else {
                x = xNext;
                y = yNext;
                path.push([x, y]);
            }
        }

        return { path, loop };
    }

    partOne(input) {
        let { path } = this.#getGuardPath(input);
        return new Set(path.map(([x, y]) => `${x},${y}`)).size;
    }

    partTwo(input) {
        let count = 0;
        let [guardX, guardY] = this.#getGuardPos(input);
        let { path } = this.#getGuardPath(input);
        let checked = { [`${guardX},${guardY}`]: true };

        path.forEach(([x, y]) => {
            let checkedId = `${x},${y}`;

            if (!checked[checkedId]) {
                input[y][x] = "#";

                if (this.#getGuardPath(input).loop) {
                    count += 1;
                }

                input[y][x] = ".";
                checked[checkedId] = true;
            }
        });

        return count;
    }
}

new Day6().solve();
