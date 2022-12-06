import { Day } from "../utils.js";

class Day2 extends Day {
    constructor() {
        super(2);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            const [dir, num] = line.split(" ");
            return { dir, num: parseInt(num) };
        });
    }

    partOne(input) {
        let horizontal = 0;
        let depth = 0;

        input.forEach((cmd) => {
            if (cmd.dir === "forward") {
                horizontal += cmd.num;
            } else {
                depth += cmd.num * (cmd.dir === "up" ? -1 : 1);
            }
        });

        return horizontal * depth;
    }

    partTwo(input) {
        let aim = 0;
        let horizontal = 0;
        let depth = 0;

        input.forEach((cmd) => {
            if (cmd.dir === "forward") {
                horizontal += cmd.num;
                depth += cmd.num * aim;
            } else {
                aim += cmd.num * (cmd.dir === "up" ? -1 : 1);
            }
        });

        return horizontal * depth;
    }
}

new Day2().solve();
