import { Day } from "../utils.js";

class Day13 extends Day {
    constructor() {
        super(13);
    }

    preprocess(text) {
        return text
            .split("\n\n")
            .map((line) => line.split("\n").map((line) => JSON.parse(line)));
    }

    #listCompare(left, right) {
        let index = 0;
        let leftItem = left[index];
        let rightItem = right[index];
        let result = undefined;

        while (result === undefined) {
            if (!leftItem && rightItem) result = true;
            if (leftItem && !rightItem) result = false;
            if (!leftItem && !rightItem) result = null;

            if (typeof leftItem === "number" && typeof rightItem === "number") {
                if (leftItem < rightItem) result = true;
                if (rightItem < leftItem) result = false;
            } else {
                if (leftItem && rightItem) {
                    let compare = this.#listCompare(
                        [leftItem].flat(),
                        [rightItem].flat()
                    );

                    if (compare !== null) {
                        result = compare;
                    }
                }
            }

            index++;
            leftItem = left[index];
            rightItem = right[index];
        }

        return result;
    }

    partOne(input) {
        return input.reduce((prev, curr, index) => {
            let rightOrder = this.#listCompare(curr[0], curr[1]);
            return prev + (rightOrder ? index + 1 : 0);
        }, 0);
    }

    partTwo(input) {
        let flat = input.flat();
        let lowDivider = [[2]];
        let highDivider = [[6]];
        flat.push(...[lowDivider, highDivider]);

        let sorted = flat.sort((a, b) => {
            return this.#listCompare(a, b) ? -1 : 1;
        });

        return (
            (sorted.indexOf(highDivider) + 1) * (sorted.indexOf(lowDivider) + 1)
        );
    }
}

new Day13().solve();
