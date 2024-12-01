import fs from "fs";

export class Day {
    #num;

    constructor(num) {
        this.#num = num;
    }

    preprocess(text) {
        return text.split("\n");
    }

    #getInput() {
        const text = fs.readFileSync(`src/day${this.#num}/input.txt`, {
            encoding: "utf-8",
        });

        return this.preprocess(text);
    }

    partOne(input) {
        return null;
    }

    partTwo(input) {
        return null;
    }

    solve() {
        console.log(`2024 Day ${this.#num}`);
        console.log(`Part 1: ${this.partOne(this.#getInput())}`);
        console.log(`Part 2: ${this.partTwo(this.#getInput())}`);
    }
}
