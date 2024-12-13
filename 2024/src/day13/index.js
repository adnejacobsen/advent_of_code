import { Day } from "../utils.js";

class Day13 extends Day {
    constructor() {
        super(13);
    }

    preprocess(text) {
        return text.split("\n\n").map((machine) => {
            machine = machine.replace(/\+|\=|X|Y/g, "");

            return machine.split("\n").map((line) => {
                return line
                    .split(": ")[1]
                    .split(", ")
                    .map((n) => parseInt(n));
            });
        });
    }

    #maybeInt(n) {
        // fix floating point shenanigans
        if (n % 1 > 0.999) {
            return Math.ceil(n);
        } else if (n % 1 < 0.001) {
            return Math.floor(n);
        }

        return n;
    }

    #getButtonClicks(a1, b1, p1, a2, b2, p2) {
        let d = (a1 / a2) * -1;
        let b = (p2 * d + p1) / (b1 + b2 * d);
        let a = (p1 - b1 * b) / a1;

        a = this.#maybeInt(a);
        b = this.#maybeInt(b);

        if (a % 1 === 0 && b % 1 === 0) {
            return { a, b, sum: a + b };
        }

        return null;
    }

    partOne(machines) {
        let total = 0;

        for (let [a, b, prize] of machines) {
            let clicks = this.#getButtonClicks(
                a[0],
                b[0],
                prize[0],
                a[1],
                b[1],
                prize[1]
            );

            if (clicks && clicks.sum <= 200) {
                total += clicks.a * 3 + clicks.b;
            }
        }

        return total;
    }

    partTwo(machines) {
        let total = 0;

        for (let [a, b, prize] of machines) {
            let clicks = this.#getButtonClicks(
                a[0],
                b[0],
                prize[0] + 10000000000000,
                a[1],
                b[1],
                prize[1] + 10000000000000
            );

            if (clicks) {
                total += clicks.a * 3 + clicks.b;
            }
        }

        return total;
    }
}

new Day13().solve();
