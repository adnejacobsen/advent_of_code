import fs from "fs";

export class Day {
    input;
    num;

    constructor(num) {
        const text = fs.readFileSync(`src/day${num}/input.txt`, {
            encoding: "utf-8",
        });

        this.input = this.preprocess(text);
        this.num = num;
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
        console.log(`Day ${this.num}`);
        console.log(`Part 1: ${this.partOne()}`);
        console.log(`Part 2: ${this.partTwo()}`);
    }
}
