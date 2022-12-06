import { Day } from "../utils.js";

class Day7 extends Day {
    constructor() {
        super(7);
    }

    preprocess(text) {
        return text
            .split(",")
            .map((n) => parseInt(n))
            .sort((a, b) => a - b);
    }

    partOne(input) {
        let median = input[input.length / 2];

        return input.reduce((prev, curr) => {
            return prev + Math.abs(median - curr);
        }, 0);
    }

    partTwo(input) {
        let avg = input.reduce((a, b) => a + b) / input.length;

        return input.reduce((prev, curr) => {
            let n = Math.abs(curr - Math.floor(avg));
            return prev + (n * (n + 1)) / 2;
        }, 0);
    }
}

new Day7().solve();
