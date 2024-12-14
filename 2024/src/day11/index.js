import { Day } from "../utils.js";

class Day11 extends Day {
    constructor() {
        super(11);
    }

    preprocess(text) {
        return text.split(" ").map((n) => parseInt(n));
    }

    #blink(stones, amount) {
        let prevStones = stones.reduce((prev, curr) => {
            return { ...prev, [curr]: 1 };
        }, {});

        for (let i = 0; i < amount; i++) {
            let nextStones = {};

            for (let stone in prevStones) {
                let count = prevStones[stone];
                let newStones = [];

                if (stone === "0") {
                    newStones.push("1");
                } else if (stone.length % 2 == 0) {
                    newStones.push(parseInt(stone.slice(0, stone.length / 2)));
                    newStones.push(parseInt(stone.slice(stone.length / 2)));
                } else {
                    newStones.push(parseInt(stone) * 2024);
                }

                for (let newStone of newStones) {
                    nextStones[newStone] = (nextStones[newStone] || 0) + count;
                }
            }

            prevStones = nextStones;
        }

        return Object.values(prevStones).reduce((prev, curr) => {
            return prev + curr;
        }, 0);
    }

    partOne(stones) {
        return this.#blink(stones, 25);
    }

    partTwo(stones) {
        return this.#blink(stones, 75);
    }
}

new Day11().solve();
