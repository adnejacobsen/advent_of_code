import { Day } from "../utils.js";

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
        return input.slice(0, 1).reduce((prev, curr) => {
            /*
            for (const [key, value] of Object.entries(DIGIT_MAP)) {
                curr = curr.replaceAll(key, value);
            }
            */
            let first = null;
            let last = null;

            console.log(curr);

            for (let i = 0; i < curr.length; i++) {
                const s = curr.slice(i, i + 5);
                console.log(s);

                for (const [key, value] of Object.entries(DIGIT_MAP)) {
                    if (s.includes(key)) {
                        curr = curr.replace(s, s.replace(key, value));
                    }
                }
            }

            const nums = curr.split("").filter((v) => !isNaN(parseInt(v)));
            return prev + parseInt(nums.at(0) + nums.at(-1));
        }, 0);
    }
}

new Day1().solve();
