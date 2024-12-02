import { Day } from "../utils.js";

class Day1 extends Day {
    constructor() {
        super(1);
    }

    partOne(input) {
        return input.reduce((prev, curr) => {
            const nums = curr.split("").filter((v) => !isNaN(parseInt(v)));
            return prev + parseInt(nums.at(0) + nums.at(-1));
        }, 0);
    }

    partTwo(input) {
        const DIGIT_MAP = {
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
        };

        let newInput = input.map((line) => {
            let newLine = `${line}`;

            Object.keys(DIGIT_MAP).forEach((digit) => {
                newLine = newLine.replace(digit, DIGIT_MAP[digit]);
            });

            return newLine;
        });

        return this.partOne(newInput);
    }
}

new Day1().solve();
