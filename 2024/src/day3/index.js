import { Day } from "../utils.js";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    preprocess(text) {
        return text;
    }

    partOne(input) {
        let muls = input.match(/(mul\([0-9]{1,},[0-9]{1,}\))/gm);

        return muls.reduce((prev, curr) => {
            const [a, b] = curr.replace("mul(", "").replace(")", "").split(",");
            return prev + parseInt(a) * parseInt(b);
        }, 0);
    }

    partTwo(input) {
        let total = 0;
        let isDo = true;

        let instructions = input.match(
            /(mul\([0-9]{1,},[0-9]{1,}\))|(don't\(\))|(do\(\))/gm
        );

        instructions.forEach((ins) => {
            if (ins === "don't()") isDo = false;
            if (ins === "do()") isDo = true;
            if (isDo && ins.slice(0, 3) === "mul") {
                const [a, b] = ins
                    .replace("mul(", "")
                    .replace(")", "")
                    .split(",");

                total += parseInt(a) * parseInt(b);
            }
        });

        return total;
    }
}

new Day3().solve();
