import { Day } from "../utils.js";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(""));
    }

    partOne(input) {
        let total = 0;

        for (let y = 0; y < input.length; y++) {
            let num = "";

            for (let x = 0; x <= input[0].length; x++) {
                let curr = input[y][x];

                if (!isNaN(curr)) {
                    num += curr;
                } else {
                    if (num.length === 0) continue;

                    let startX = x - num.length - 1;
                    let done = false;

                    for (let sy = y - 1; sy <= y + 1; sy++) {
                        if (done) break;
                        if (!input[sy]) continue;

                        for (let sx = startX; sx <= x; sx++) {
                            if (done) break;
                            if (!input[sy][sx]) continue;

                            let sCurr = input[sy][sx];

                            if (isNaN(sCurr) && sCurr !== ".") {
                                total += parseInt(num);
                                done = true;
                            }
                        }
                    }

                    num = "";
                }
            }
        }

        return total;
    }

    partTwo(input) {
        let gears = {};

        for (let y = 0; y < input.length; y++) {
            let num = "";

            for (let x = 0; x <= input[0].length; x++) {
                let curr = input[y][x];

                if (!isNaN(curr)) {
                    num += curr;
                } else {
                    if (num.length === 0) continue;

                    let startX = x - num.length - 1;

                    for (let sy = y - 1; sy <= y + 1; sy++) {
                        if (!input[sy]) continue;

                        for (let sx = startX; sx <= x; sx++) {
                            if (!input[sy][sx]) continue;

                            if (input[sy][sx] === "*") {
                                let coordinate = `${sx},${sy}`;
                                gears[coordinate] = [
                                    ...(gears[coordinate] || []),
                                    num,
                                ];
                            }
                        }
                    }

                    num = "";
                }
            }
        }

        return Object.values(gears)
            .filter((nums) => nums.length === 2)
            .reduce((prev, curr) => {
                return prev + curr[0] * curr[1];
            }, 0);
    }
}

new Day3().solve();
