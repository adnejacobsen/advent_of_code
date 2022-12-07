import { Day } from "../utils.js";

class Day7 extends Day {
    constructor() {
        super(7);
    }

    preprocess(text) {
        let commands = text.split("\n").map((line) => line.split(" "));
        let paths = [];
        let sizes = {};

        commands.forEach((line) => {
            if (line[1] === "cd") {
                if (line[2] === "..") {
                    paths.pop();
                } else {
                    paths.push([...paths, line[2]].join("/"));
                }
            }

            if (!isNaN(line[0])) {
                paths.forEach((path) => {
                    sizes[path] = (sizes[path] || 0) + parseInt(line[0]);
                });
            }
        });

        return {
            sizes: Object.values(sizes).sort((a, b) => a - b),
            total: sizes["/"],
        };
    }

    partOne({ sizes }) {
        return sizes.filter((s) => s <= 100000).reduce((a, b) => a + b);
    }

    partTwo({ sizes, total }) {
        const spaceNeeded = Math.abs(70000000 - total - 30000000);
        return sizes.filter((s) => s >= spaceNeeded)[0];
    }
}

new Day7().solve();
