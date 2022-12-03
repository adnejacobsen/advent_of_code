import { Day } from "../utils.js";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    #getPriority(item) {
        const offset = item === item.toLowerCase() ? 96 : 38;
        return item.charCodeAt() - offset;
    }

    preprocess(text) {
        return text.split("\n").map((l) => l.split(""));
    }

    partOne() {
        return this.input.reduce((total, rucksack) => {
            const compA = rucksack.slice(0, rucksack.length / 2);
            const compB = rucksack.slice(rucksack.length / 2);
            const common = compA.filter((i) => compB.includes(i));
            return total + this.#getPriority(common[0]);
        }, 0);
    }

    partTwo() {
        let total = 0;

        for (let i = 0; i < this.input.length; i += 3) {
            const a = this.input[i];
            const b = this.input[i + 1];
            const c = this.input[i + 2];
            const common = a.filter((i) => b.includes(i) && c.includes(i));
            total += this.#getPriority(common[0]);
        }

        return total;
    }
}

new Day3().solve();
