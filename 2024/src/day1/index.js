import { Day } from "../utils.js";

class Day1 extends Day {
    constructor() {
        super(1);
    }

    preprocess(text) {
        let left = [];
        let right = [];

        text.split("\n").forEach((line) => {
            let [leftNum, rightNum] = line.split("   ");
            left.push(parseInt(leftNum));
            right.push(parseInt(rightNum));
        });

        return {
            left: left.sort(),
            right: right.sort(),
        };
    }

    partOne({ left, right }) {
        return left.reduce((prev, curr, index) => {
            return prev + Math.abs(curr - right[index]);
        }, 0);
    }

    partTwo({ left, right }) {
        return left.reduce((prev, curr) => {
            return prev + curr * right.filter((n) => n === curr).length;
        }, 0);
    }
}

new Day1().solve();
