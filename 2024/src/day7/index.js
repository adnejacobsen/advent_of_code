import { Day } from "../utils.js";

class Day7 extends Day {
    constructor() {
        super(7);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            let [target, nums] = line.split(": ");

            return {
                target: parseInt(target),
                nums: nums.split(" ").map((n) => parseInt(n)),
            };
        });
    }

    #process(input, aggregator) {
        let total = 0;

        input.forEach(({ target, nums }) => {
            let results = [nums[0]];

            for (let i = 1; i < nums.length; i++) {
                let newResults = [];
                let num = nums[i];

                results.forEach((result) => {
                    newResults.push(...aggregator(result, num));
                });

                results = newResults;
            }

            let found = results.find((result) => result === target);

            if (found) {
                total += found;
            }
        });

        return total;
    }

    partOne(input) {
        return this.#process(input, (result, num) => {
            return [result + num, result * num];
        });
    }

    partTwo(input) {
        return this.#process(input, (result, num) => {
            return [result + num, result * num, parseInt(`${result}${num}`)];
        });
    }
}

new Day7().solve();
