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

    #isUpdateCorrect(update, rules) {
        let correct = true;
        let applicable = [];
        let broken = [];

        rules.forEach(([x, y]) => {
            let xIndex = update.findIndex((n) => n === x);
            let yIndex = update.findIndex((n) => n === y);

            if (xIndex !== -1 && yIndex !== -1) {
                applicable.push([x, y]);

                if (xIndex > yIndex) {
                    broken.push([x, y]);
                    correct = false;
                }
            }
        });

        return { correct, applicable, broken };
    }

    partOne({ rules, updates }) {
        return updates.reduce((prev, curr) => {
            let { correct } = this.#isUpdateCorrect(curr, rules);
            return prev + (correct ? curr[(curr.length - 1) / 2] : 0);
        }, 0);
    }

    partTwo({ rules, updates }) {
        return updates.reduce((total, curr) => {
            let initial = this.#isUpdateCorrect(curr, rules);

            if (!initial.correct) {
                let fixed = [...curr];
                let broken = initial.broken;

                while (broken.length > 0) {
                    let [x, y] = broken[0];
                    let xIndex = fixed.findIndex((n) => n === x);
                    let yIndex = fixed.findIndex((n) => n === y);

                    fixed[xIndex] = y;
                    fixed[yIndex] = x;

                    broken = this.#isUpdateCorrect(fixed, rules).broken;
                }

                return total + fixed[(fixed.length - 1) / 2];
            }

            return total;
        }, 0);
    }
}

new Day5().solve();
