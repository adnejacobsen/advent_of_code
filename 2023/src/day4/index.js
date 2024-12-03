import { Day } from "../utils.js";

class Day4 extends Day {
    constructor() {
        super(4);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            const [winners, numbers] = line.split(" | ");

            return {
                winners: winners
                    .split(": ")[1]
                    .split(" ")
                    .map((n) => parseInt(n))
                    .filter((n) => !isNaN(n)),
                numbers: numbers
                    .split(" ")
                    .map((n) => parseInt(n))
                    .filter((n) => !isNaN(n)),
            };
        });
    }

    partOne(input) {
        let total = 0;

        input.forEach(({ winners, numbers }) => {
            let points = 0;

            winners.forEach((winner) => {
                if (numbers.includes(winner)) {
                    if (points == 0) {
                        points = 1;
                    } else {
                        points = points * 2;
                    }
                }
            });

            total += points;
            points = 0;
        });

        return total;
    }

    partTwo(input, index = 0, stop = undefined, total = 0) {
        let newTotal = total;

        for (let i = index; i <= stop || input.length - 1; i++) {
            const { winners, numbers } = input[i];
            let points = 0;

            winners.forEach((winner) => {
                if (numbers.includes(winner)) {
                    points += 1;
                }
            });

            if (points > 0) {
                newTotal += this.partTwo(input, i + 1, i + points, newTotal);
            }

            newTotal += points;
            points = 0;
        }

        return newTotal;
    }
}

new Day4().solve();
