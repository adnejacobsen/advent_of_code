import { Day } from "../utils.js";

class Day6 extends Day {
    constructor() {
        super(6);
    }

    preprocess(text) {
        return text.split("");
    }

    #findMarker(input, length) {
        let index = 0;
        let done = false;

        while (!done) {
            let chars = input.slice(index, index + length);

            done = chars.every((c) => {
                return chars.indexOf(c) === chars.lastIndexOf(c);
            });

            index++;
        }

        return index + (length - 1);
    }

    partOne() {
        return this.#findMarker(this.input, 4);
    }

    partTwo() {
        return this.#findMarker(this.input, 14);
    }
}

new Day6().solve();
