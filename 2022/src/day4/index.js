import { Day } from "../utils.js";

class Day4 extends Day {
    constructor() {
        super(4);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            return line
                .split(",")
                .map((part) => part.split("-").map((n) => parseInt(n)));
        });
    }

    partOne() {
        return this.input.reduce((prev, [e1, e2]) => {
            if (
                (e1[0] >= e2[0] && e1[1] <= e2[1]) ||
                (e2[0] >= e1[0] && e2[1] <= e1[1])
            ) {
                return ++prev;
            }

            return prev;
        }, 0);
    }

    partTwo() {
        return this.input.reduce((prev, [e1, e2]) => {
            if (
                (e1[1] >= e2[0] && e1[1] <= e2[1]) ||
                (e2[1] >= e1[0] && e2[1] <= e1[1])
            ) {
                return ++prev;
            }

            return prev;
        }, 0);
    }
}

new Day4().solve();
