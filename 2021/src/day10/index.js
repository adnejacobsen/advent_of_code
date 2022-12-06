import { Day } from "../utils.js";

class Day10 extends Day {
    pairs = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">",
        ")": "(",
        "]": "[",
        "}": "{",
        ">": "<",
    };

    constructor() {
        super(10);
    }

    preprocess(text) {
        const errors = [];
        const autocomplete = [];

        text.split("\n")
            .map((line) => line.split(""))
            .forEach((line) => {
                let open = [];
                let done = false;
                let index = 0;

                while (!done) {
                    let tag = line[index];

                    if (index < line.length) {
                        if (/\(|\[|\<|\{/.test(tag)) {
                            open.push(tag);
                        } else if (this.pairs[tag] !== open.pop(-1)) {
                            errors.push(tag);
                            done = true;
                        }
                    } else {
                        let missing = open.map((o) => this.pairs[o]).reverse();
                        autocomplete.push(missing);
                        done = true;
                    }

                    index++;
                }
            });

        return { errors, autocomplete };
    }

    partOne({ errors }) {
        const points = {
            ")": 3,
            "]": 57,
            "}": 1197,
            ">": 25137,
        };

        return errors.map((e) => points[e]).reduce((a, b) => a + b);
    }

    partTwo({ autocomplete }) {
        const points = {
            ")": 1,
            "]": 2,
            "}": 3,
            ">": 4,
        };

        const scores = autocomplete
            .map((c) => {
                return c.reduce((prev, curr) => {
                    return prev * 5 + points[curr];
                }, 0);
            })
            .sort((a, b) => b - a);

        return scores[Math.floor(scores.length / 2)];
    }
}

new Day10().solve();
