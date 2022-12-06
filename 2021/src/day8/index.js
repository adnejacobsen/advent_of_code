import { Day } from "../utils.js";

class Day8 extends Day {
    constructor() {
        super(8);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            return line.split(" | ").map((section) => {
                return section.split(" ").map((w) => {
                    return w.split("").sort().join("");
                });
            });
        });
    }

    #getWireMapping(wires) {
        let one = wires.find((w) => w.length === 2);
        let four = wires.find((w) => w.length === 4);
        let seven = wires.find((w) => w.length === 3);
        let eight = wires.find((w) => w.length === 7);
        let six = wires.find((w) => {
            let missing2 = one.split("").filter((n) => !w.includes(n)).length;
            return w.length === 6 && missing2 === 1;
        });

        let a = seven.split("").find((n) => !one.includes(n));
        let c = eight.split("").find((n) => !six.includes(n));
        let f = one.split("").find((n) => n !== c);
        let three = wires.find((w) => {
            return [a, c, f].every((n) => w.includes(n)) && w.length === 5;
        });

        let two = wires.find((w) => {
            return (
                [a, c].every((n) => w.includes(n)) &&
                w.length === 5 &&
                !w.includes(f)
            );
        });

        let e = two.split("").find((n) => !three.includes(n));
        let five = wires.find((w) => {
            return w.length === 5 && !w.includes(c) && !w.includes(e);
        });

        let nine = wires.find((w) => w.length === 6 && !w.includes(e));
        let zero = wires.find((w) => w.length === 6 && w !== nine && w !== six);

        return {
            [zero]: 0,
            [one]: 1,
            [two]: 2,
            [three]: 3,
            [four]: 4,
            [five]: 5,
            [six]: 6,
            [seven]: 7,
            [eight]: 8,
            [nine]: 9,
        };
    }

    partOne(input) {
        return input.reduce((prev, curr) => {
            return curr[1].reduce((total, output) => {
                return total + ([2, 4, 3, 7].includes(output.length) ? 1 : 0);
            }, prev);
        }, 0);
    }

    partTwo(input) {
        return input
            .map(([wires, output]) => {
                let map = this.#getWireMapping(wires);
                return parseInt(output.map((o) => map[o]).join(""));
            })
            .reduce((a, b) => a + b);
    }
}

new Day8().solve();
