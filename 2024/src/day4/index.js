import { Day } from "../utils.js";

class Day4 extends Day {
    constructor() {
        super(4);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(""));
    }

    partOne(input) {
        let count = 0;

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                let cur = input[y][x];

                if (cur === "X") {
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy == 0) continue;

                            let word = "";

                            for (let n = 0; n < 4; n++) {
                                let letter = input?.[y + dy * n]?.[x + dx * n];

                                if (letter) {
                                    word += letter;
                                } else {
                                    break;
                                }
                            }

                            if (["XMAS", "SAMX"].includes(word)) {
                                count += 1;
                            }

                            word = "";
                        }
                    }
                }
            }
        }

        return count;
    }

    partTwo(input) {
        let count = 0;

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                let cur = input[y][x];

                if (cur === "A") {
                    let topLeft = input?.[y - 1]?.[x - 1];
                    let topRight = input?.[y - 1]?.[x + 1];
                    let bottomLeft = input?.[y + 1]?.[x - 1];
                    let bottomRight = input?.[y + 1]?.[x + 1];

                    let a = `${topLeft}A${bottomRight}`;
                    let b = `${topRight}A${bottomLeft}`;

                    if ([a, b].every((n) => ["MAS", "SAM"].includes(n))) {
                        count += 1;
                    }
                }
            }
        }

        return count;
    }
}

new Day4().solve();
