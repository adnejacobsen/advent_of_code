import fs from "fs";

export class Day {
    num;
    #text;

    constructor(num) {
        this.num = num;
        this.#text = fs.readFileSync(`src/day${num}/input.txt`, {
            encoding: "utf-8",
        });
    }

    get input() {
        return this.preprocess(this.#text);
    }

    preprocess(text) {
        return text.split("\n");
    }

    partOne() {
        return null;
    }

    partTwo() {
        return null;
    }

    solve() {
        console.log(`2022 Day ${this.num}`);
        console.log(`Part 1: ${this.partOne()}`);
        console.log(`Part 2: ${this.partTwo()}`);
    }
}
