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
        const height = forest[y][x];
        const left = forest[y].slice(0, x).reverse();
        const right = forest[y].slice(x + 1);
        const bottom = forest.slice(y + 1).map((row) => row[x]);
        const top = forest
            .slice(0, y)
            .map((row) => row[x])
            .reverse();

        const view = [left, right, top, bottom].map((trees) => {
            let view = trees.findIndex((tree) => tree >= height);
            return view < 0 ? trees.length : view + 1;
        });

        return { height, left, right, top, bottom, view };
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

        this.#loopForest(input, ({ height, left, right, top, bottom }) => {
            let isVisible = [left, right, top, bottom].some((trees) => {
                return trees.every((tree) => tree < height);
            });

            if (isVisible) visible++;
        });

        return visible;
    }

    partTwo(input) {
        const views = [];

        this.#loopForest(input, ({ view }) => {
            views.push(view.reduce((prev, curr) => prev * curr));
        });

        return views.sort((a, b) => b - a)[0];
    }
}

new Day8().solve();
