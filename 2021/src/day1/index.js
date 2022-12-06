import { Day } from "../utils.js";

class Day1 extends Day {
    constructor() {
        super(1);
    }

    preprocess(text) {
        return text.split("\n").map((line) => parseInt(line));
    }

    partOne(input) {
        return input.reduce((prev, curr, index, values) => {
            return prev + (curr > values[index - 1] ? 1 : 0);
        }, 0);
    }

    partTwo(input) {
        const window = (index, size) => {
            return input
                .slice(index, index + size)
                .reduce((prev, curr) => prev + curr, 0);
        };

        return input.reduce((prev, _, index) => {
            return prev + (window(index + 1, 3) > window(index, 3) ? 1 : 0);
        }, 0);
    }
}

new Day1().solve();
