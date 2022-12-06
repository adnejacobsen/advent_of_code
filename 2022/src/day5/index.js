import { Day } from "../utils.js";

class Day5 extends Day {
    constructor() {
        super(5);
    }

    preprocess(text) {
        let [cargo, moves] = text.split("\n\n").map((l) => l.split("\n"));
        let indices = cargo.pop();
        let boxes = [];

        cargo.reverse().forEach((line) => {
            line.split("").forEach((box, index) => {
                if (box.match(/[A-Z]/g)) {
                    let stackIndex = parseInt(indices[index]) - 1;
                    boxes[stackIndex] = [...(boxes[stackIndex] || []), box];
                }
            });
        });

        moves = moves.map((move) => {
            let w = move.split(" from ");
            let m = w[0].replace("move ", "");
            let [f, t] = w[1].split(" to ");

            return [m, f, t].map((n) => parseInt(n));
        });

        return { boxes, moves };
    }

    partOne({ boxes, moves }) {
        moves.forEach(([move, from, to]) => {
            let f = boxes[from - 1];
            let m = f.splice(f.length - move).reverse();

            boxes[from - 1] = f;
            boxes[to - 1].push(...m);
        });

        return boxes.reduce((prev, curr) => prev + curr.at(-1), "");
    }

    partTwo({ boxes, moves }) {
        moves.forEach(([move, from, to]) => {
            let f = boxes[from - 1];
            let m = f.splice(f.length - move);

            boxes[from - 1] = f;
            boxes[to - 1].push(...m);
        });

        return boxes.reduce((prev, curr) => prev + curr.at(-1), "");
    }
}

new Day5().solve();
