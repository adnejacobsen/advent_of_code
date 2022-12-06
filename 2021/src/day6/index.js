import { Day } from "../utils.js";

class Day6 extends Day {
    constructor() {
        super(6);
    }

    preprocess(text) {
        return text.split(",").map((n) => parseInt(n));
    }

    #getFishCount(fish, days) {
        let state = fish.reduce((prev, curr) => {
            return { ...prev, [curr]: (prev?.[curr] || 0) + 1 };
        }, {});

        for (let d = 0; d < days; d++) {
            let zero = state[0] || 0;

            for (let i = 0; i < 8; i++) {
                state[i] = state[i + 1];
            }

            state[6] = (state[6] || 0) + zero;
            state[8] = zero;
        }

        return Object.values(state).reduce((a, b) => a + b);
    }

    partOne(input) {
        return this.#getFishCount(input, 80);
    }

    partTwo(input) {
        return this.#getFishCount(input, 256);
    }
}

new Day6().solve();
