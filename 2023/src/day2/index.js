import { Day } from "../utils.js";

class Day2 extends Day {
    constructor() {
        super(2);
    }

    preprocess(text) {
        return text.split("\n").map((line) => {
            let [header, content] = line.split(": ");

            return {
                id: parseInt(header.split(" ")[1]),
                hands: content.split("; ").map((hand) => {
                    return hand.split(", ").reduce((prev, curr) => {
                        let [num, color] = curr.split(" ");

                        return {
                            ...prev,
                            [color]: parseInt(num.trim()),
                        };
                    }, {});
                }),
            };
        });
    }

    partOne(input) {
        return input
            .filter((game) => {
                return game.hands.every((hand) => {
                    if (hand?.red > 12) return false;
                    if (hand?.green > 13) return false;
                    if (hand?.blue > 14) return false;

                    return true;
                });
            })
            .reduce((prev, curr) => {
                return prev + curr.id;
            }, 0);
    }

    partTwo(input) {
        let total = 0;

        input.forEach((game) => {
            let cubes = {};

            game.hands.forEach((hand) => {
                Object.keys(hand).forEach((color) => {
                    if (hand[color] > (cubes?.[color] || 0)) {
                        cubes[color] = hand[color];
                    }
                });
            });

            total += Object.values(cubes).reduce((prev, curr) => {
                return prev * curr;
            }, 1);
        });

        return total;
    }
}

new Day2().solve();
