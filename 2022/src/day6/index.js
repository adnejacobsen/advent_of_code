import { Day } from "../utils.js";

class Day6 extends Day {
    constructor() {
        super(6);
    }

    preprocess(text) {
        return text.split("");
    }

    #findMarker(input, length) {
        let markerIndex = input.findIndex((_, index) => {
            return input
                .slice(index, index + length)
                .every((char, _, chars) => {
                    return chars.indexOf(char) === chars.lastIndexOf(char);
                });
        });

        return markerIndex + length;
    }

    partOne(input) {
        return this.#findMarker(input, 4);
    }

    partTwo(input) {
        return this.#findMarker(input, 14);
    }
}

new Day6().solve();
