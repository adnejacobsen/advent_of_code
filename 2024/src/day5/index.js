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
        return updates.reduce((total, update) => {
            let correct = this.#getBrokenRules(update, rules).length === 0;
            return total + (correct ? update[(update.length - 1) / 2] : 0);
        }, 0);
    }

    partTwo({ rules, updates }) {
        return updates.reduce((total, update) => {
            let brokenRules = this.#getBrokenRules(update, rules);

            if (brokenRules.length > 0) {
                while (brokenRules.length > 0) {
                    let [x, y] = brokenRules[0];
                    let xIndex = update.findIndex((n) => n === x);
                    let yIndex = update.findIndex((n) => n === y);

                    update[xIndex] = y;
                    update[yIndex] = x;

                    brokenRules = this.#getBrokenRules(update, rules);
                }

                return total + update[(update.length - 1) / 2];
            }

            return total;
        }, 0);
    }
}

new Day5().solve();
