import { Day } from "../utils.js";

class Day1 extends Day {
    constructor() {
        super(1);
    }

    preprocess(text) {
        return text
            .split("\n\n")
            .map((section) => {
                return section
                    .split("\n")
                    .reduce((prev, curr) => prev + parseInt(curr), 0);
            })
            .sort((a, b) => b - a);
    }

    partOne(input) {
        return input[0];
    }

    partTwo(input) {
        return input.slice(0, 3).reduce((prev, curr) => prev + curr);
    }
}

new Day1().solve();
