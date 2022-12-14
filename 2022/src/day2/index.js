import { Day } from "../utils.js";

class Day2 extends Day {
    resultsMatrix = [
        [0, 1, -1],
        [-1, 0, 1],
        [1, -1, 0],
    ];

    constructor() {
        super(2);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(" "));
    }

    #charToNum(char, offset) {
        return char.toLowerCase().charCodeAt() - offset;
    }

    partOne(input) {
        return input.reduce((total, input) => {
            const elf = this.#charToNum(input[0], 97);
            const you = this.#charToNum(input[1], 120);
            const result = this.resultsMatrix[elf][you];

            return total + (you + 1) + (result + 1) * 3;
        }, 0);
    }

    partTwo(input) {
        return input.reduce((total, input) => {
            const elf = this.#charToNum(input[0], 97);
            const result = this.#charToNum(input[1], 121);
            const you = this.resultsMatrix[elf].indexOf(result);

            return total + (you + 1) + (result + 1) * 3;
        }, 0);
    }
}

new Day2().solve();
