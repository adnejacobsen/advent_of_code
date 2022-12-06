import { Day } from "../utils.js";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    preprocess(text) {
        return text.split("\n").map((l) => l.split(""));
    }

    #getPriority(item) {
        const offset = item === item.toLowerCase() ? 96 : 38;
        return item.charCodeAt() - offset;
    }

    partOne(input) {
        return input.reduce((total, rucksack) => {
            const compA = rucksack.slice(0, rucksack.length / 2);
            const compB = rucksack.slice(rucksack.length / 2);
            const common = compA.filter((i) => compB.includes(i));
            return total + this.#getPriority(common[0]);
        }, 0);
    }

    partTwo(input) {
        let total = 0;

        for (let i = 0; i < input.length; i += 3) {
            const [a, b, c] = input.slice(i, i + 3);
            const common = a.filter((i) => b.includes(i) && c.includes(i));
            total += this.#getPriority(common[0]);
        }

        return total;
    }
}

new Day3().solve();
