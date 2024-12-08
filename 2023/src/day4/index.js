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

    #getPoints(input, index, follow = false) {
        let { winners, numbers } = input[index];
        let totalPoints = 0;
        let cardPoints = winners.reduce((points, winner) => {
            return points + (numbers.includes(winner) ? 1 : 0);
        }, 0);

        totalPoints += cardPoints;

        if (follow && cardPoints) {
            for (let i = index + 1; i < index + 1 + cardPoints; i++) {
                totalPoints += this.#getPoints(input, i, true);
            }
        }

        return totalPoints;
    }

    partOne(input) {
        let total = 0;

        for (let i = 0; i < input.length; i++) {
            let points = this.#getPoints(input, i, false);

            if (points > 1) {
                total += 2 ** (points - 1);
            } else {
                total += points;
            }
        }

        return total;
    }

    partTwo(input) {
        let total = input.length;

        for (let i = 0; i < input.length; i++) {
            total += this.#getPoints(input, i, true);
        }

        return total;
    }
}

new Day4().solve();
