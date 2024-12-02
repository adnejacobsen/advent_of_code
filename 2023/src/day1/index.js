import { Day } from "../utils.js";

class Day1 extends Day {
    constructor() {
        super(1);
    }

    partOne(input) {
        return input.reduce((prev, curr) => {
            const nums = curr.split("").filter((c) => !isNaN(c));
            return prev + parseInt(`${nums.at(0)}${nums.at(-1)}`);
        }, 0);
    }

    #searchFirstNumber(line, reverse = false) {
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

        let newLine = `${line}`;

        for (
            let i = reverse ? newLine.length - 1 : -4;
            (reverse && i > 0) || (!reverse && i < newLine.length);
            i += reverse ? -1 : 1
        ) {
            let start = i < 0 ? 0 : i;
            let end = i + 5;
            let section = newLine.slice(start, end);
            let before = "";
            let after = "";

            if (start > 0) {
                before = newLine.slice(0, start);
            }

            if (end < newLine.length) {
                after = newLine.slice(end);
            }

            let newSection = Object.keys(DIGIT_MAP).reduce((prev, key) => {
                return prev.replaceAll(key, DIGIT_MAP[key]);
            }, section);

            if (newSection !== section) {
                newLine = `${before}${newSection}${after}`;
            }
        }

        return newLine
            .split("")
            .filter((c) => !isNaN(c))
            .at(reverse ? -1 : 0);
    }

    partTwo(input) {
        let total = 0;

        input.forEach((line) => {
            let first = this.#searchFirstNumber(line);
            let last = this.#searchFirstNumber(line, true);

            total += parseInt(`${first}${last}`);
        });

        return total;
    }
}

new Day1().solve();
