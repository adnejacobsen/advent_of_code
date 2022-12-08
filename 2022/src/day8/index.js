import { Day } from "../utils.js";

class Day8 extends Day {
    constructor() {
        super(8);
    }

    preprocess(text) {
        return text
            .split("\n")
            .map((line) => line.split("").map((n) => parseInt(n)));
    }

    #getTreeInfo(forest, x, y) {
        const h = forest[y][x];
        const l = forest[y].slice(0, x).reverse();
        const r = forest[y].slice(x + 1);
        const b = forest.slice(y + 1).map((row) => row[x]);
        const t = forest
            .slice(0, y)
            .map((row) => row[x])
            .reverse();

        let v = [l, r, t, b].map((s) => {
            let d = s.findIndex((v) => v >= h);
            return d < 0 ? s.length : d + 1;
        });

        return { h, l, r, t, b, v };
    }

    #loopForest(forest, callback) {
        for (let y = 0; y < forest.length; y++) {
            for (let x = 0; x < forest[0].length; x++) {
                callback(this.#getTreeInfo(forest, x, y));
            }
        }
    }

    partOne(input) {
        let visible = 0;

        this.#loopForest(input, ({ h, l, r, t, b }) => {
            if (
                l.every((n) => n < h) ||
                r.every((n) => n < h) ||
                t.every((n) => n < h) ||
                b.every((n) => n < h)
            ) {
                visible++;
            }
        });

        return visible;
    }

    partTwo(input) {
        const scenic = [];

        this.#loopForest(input, ({ v }) => {
            scenic.push(v[0] * v[1] * v[2] * v[3]);
        });

        return scenic.sort((a, b) => b - a)[0];
    }
}

new Day8().solve();
