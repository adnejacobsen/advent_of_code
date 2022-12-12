import { Day } from "../utils.js";

class Day11 extends Day {
    constructor() {
        super(11);
    }

    preprocess(text) {
        return text.split("\n\n").map((monkey) => {
            let rows = monkey.split("\n");
            let items = rows[1]
                .split(":")[1]
                .split(",")
                .map((n) => parseInt(n));

            let operation = rows[2]
                .split(":")[1]
                .split(" = old ")[1]
                .split(" ");

            let divisible = parseInt(rows[3].split(": ")[1].split(" by ")[1]);

            return {
                items,
                operation,
                test: {
                    divisible,
                    isTrue: parseInt(rows[4].split("monkey ")[1]),
                    isFalse: parseInt(rows[5].split("monkey ")[1]),
                },
            };
        });
    }

    #simulate(input, rounds, manageWorryLevel) {
        let monkeys = [...input];
        let counts = [];

        for (let r = 0; r < rounds; r++) {
            monkeys.forEach((monkey, index) => {
                let [operation, value] = monkey.operation;
                let { divisible, isTrue, isFalse } = monkey.test;

                monkey.items.forEach((item) => {
                    let v = value === "old" ? item : parseInt(value);
                    let i = 0;

                    if (operation === "*") i = item * v;
                    if (operation === "+") i = item + v;

                    i = manageWorryLevel(i);

                    let result = i % divisible === 0;
                    let newMonkey = result ? isTrue : isFalse;

                    monkeys[newMonkey].items.push(i);
                    counts[index] = (counts[index] || 0) + 1;
                });

                monkey.items = [];
            });
        }

        return counts
            .sort((a, b) => b - a)
            .slice(0, 2)
            .reduce((a, b) => a * b);
    }

    partOne(input) {
        return this.#simulate(input, 20, (i) => Math.floor(i / 3));
    }

    partTwo(input) {
        let modulo = input.reduce((prev, curr) => {
            return prev * curr.test.divisible;
        }, 1);

        return this.#simulate(input, 10000, (i) => i % modulo);
    }
}

new Day11().solve();
