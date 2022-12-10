import { Day } from "../utils.js";

class Day10 extends Day {
    constructor() {
        super(10);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split(" "));
    }

    #run(program, callback) {
        let cycle = 0;
        let x = 1;

        program.forEach(([operation, value]) => {
            let duration = operation === "addx" ? 2 : 1;

            for (let i = 0; i < duration; i++) {
                callback(++cycle, x);
            }

            x += parseInt(value) || 0;
        });
    }

    partOne(input) {
        let strengths = [];

        this.#run(input, (cycle, x) => {
            if ((cycle - 20) % 40 === 0) {
                strengths.push(cycle * x);
            }
        });

        return strengths.reduce((a, b) => a + b);
    }

    partTwo(input) {
        let position = 0;
        let output = "";

        this.#run(input, (_, x) => {
            if (position % 40 === 0) {
                position = 0;
                output += "\n";
            }

            if (position >= x - 1 && position <= x + 1) {
                output += "#";
            } else {
                output += ".";
            }

            position++;
        });

        return output;
    }
}

new Day10().solve();
