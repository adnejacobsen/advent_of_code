import { Day } from "../utils.js";

class Day12 extends Day {
    constructor() {
        super(12);
    }

    preprocess(text) {
        return text.split("\n").map((line) => line.split("-"));
    }

    partOne(input) {
        const caves = {};

        input.forEach(([from, to]) => {
            caves[from] = [...(caves[from] || []), to];
            caves[to] = [...(caves[to] || []), from];
        });

        const findPaths = (caves, from, end, paths = {}) => {
            let newPaths = { ...paths, [from]: {} };

            caves[from].forEach((to) => {
                if (to === end) {
                    newPaths[from][end] = "nice";
                    return newPaths;
                } else {
                    if (!newPaths[from][to] && to !== from) {
                        newPaths[from][to] = findPaths(
                            caves,
                            to,
                            end,
                            newPaths
                        );
                    }
                }
            });

            return newPaths;
        };

        //const paths = findPaths(caves, "start", "end");

        console.log(caves);

        return null;
    }

    partTwo(input) {
        return null;
    }
}

new Day12().solve();
