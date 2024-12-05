import { Day } from "../utils.js";

class Day5 extends Day {
    constructor() {
        super(5);
    }

    preprocess(text) {
        const [rules, updates] = text.split("\n\n");

        return {
            rules: rules
                .split("\n")
                .map((line) => line.split("|").map((n) => parseInt(n))),
            updates: updates
                .split("\n")
                .map((line) => line.split(",").map((n) => parseInt(n))),
        };
    }

    #getBrokenRules(update, rules) {
        return rules.filter(([x, y]) => {
            let xIndex = update.findIndex((n) => n === x);
            let yIndex = update.findIndex((n) => n === y);

            return xIndex !== -1 && yIndex !== -1 && xIndex > yIndex;
        });
    }

    partOne({ rules, updates }) {
        return updates.reduce((prev, curr) => {
            let correct = this.#getBrokenRules(curr, rules).length === 0;
            return prev + (correct ? curr[(curr.length - 1) / 2] : 0);
        }, 0);
    }

    partTwo({ rules, updates }) {
        return updates.reduce((total, curr) => {
            let initialBroken = this.#getBrokenRules(curr, rules);

            if (initialBroken.length > 0) {
                let fixed = [...curr];
                let broken = [...initialBroken];

                while (broken.length > 0) {
                    let [x, y] = broken[0];
                    let xIndex = fixed.findIndex((n) => n === x);
                    let yIndex = fixed.findIndex((n) => n === y);

                    fixed[xIndex] = y;
                    fixed[yIndex] = x;

                    broken = this.#getBrokenRules(fixed, rules);
                }

                return total + fixed[(fixed.length - 1) / 2];
            }

            return total;
        }, 0);
    }
}

new Day5().solve();
