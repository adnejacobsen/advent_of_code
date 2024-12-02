import { Day } from "../utils.js";

class Day4 extends Day {
    constructor() {
        super(4);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(""));
    }

    partOne(input) {
        return null;
    }

    partTwo(input) {
        return null;
    }
}

new Day4().solve();
