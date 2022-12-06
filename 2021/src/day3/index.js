import { Day } from "../utils.js";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    preprocess(text) {
        return text
            .split("\n")
            .map((bits) => bits.split("").map((bit) => parseInt(bit)));
    }

    partOne(input) {
        const counts = input.reduce((prev, curr) => {
            return prev.map((bit, index) => bit + curr[index]);
        });

        const gamma = counts.map((c) => (c > input.length / 2 ? 1 : 0));
        const epsilon = gamma.map((g) => (g - 1) * -1);

        return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
    }

    partTwo(input) {
        let o = [...input];
        let co2 = [...input];
        let index = 0;

        while (o.length > 1 || co2.length > 1) {
            if (o.length > 1) {
                const ones = o.reduce((prev, curr) => prev + curr[index], 0);
                const criteria = ones >= o.length / 2 ? 1 : 0;
                o = o.filter((value) => value[index] === criteria);
            }

            if (co2.length > 1) {
                const ones = co2.reduce((prev, curr) => prev + curr[index], 0);
                const criteria = ones >= co2.length / 2 ? 0 : 1;
                co2 = co2.filter((value) => value[index] === criteria);
            }

            index++;
        }

        return parseInt(o[0].join(""), 2) * parseInt(co2[0].join(""), 2);
    }
}

new Day3().solve();
