import { Day } from "../utils.js";

class Day4 extends Day {
    constructor() {
        super(4);
    }

    preprocess(text) {
        const sections = text.split("\n\n");
        const draws = sections.splice(0, 1)[0].split(",");
        const boards = sections.map((board) => {
            let h = board.split("\n").map((row) => {
                return row.split(" ").filter((n) => n.length > 0);
            });

            let v = [];

            for (let i = 0; i < 5; i++) {
                v.push(h.reduce((prev, curr) => [...prev, curr[i]], []));
            }

            return [...h, ...v];
        });

        return { draws, boards };
    }

    #markBoard(board, draw) {
        return board.map((line) => {
            return line.map((n) => (n === draw ? "X" : n));
        });
    }

    #checkBingo(board) {
        return board.some((line) => line.every((num) => num === "X"));
    }

    #getBoardScore(board, draw) {
        const sum = board
            .flat()
            .filter((n) => n !== "X")
            .reduce((prev, curr) => prev + parseInt(curr), 0);

        return (sum / 2) * draw;
    }

    partOne({ draws, boards }) {
        let winner = null;
        let drawIndex = 0;
        let draw = null;

        while (!winner) {
            draw = draws[drawIndex];
            boards = boards.map((board) => this.#markBoard(board, draw));
            winner = boards.find((board) => this.#checkBingo(board));
            drawIndex++;
        }

        return this.#getBoardScore(winner, draw);
    }

    partTwo({ draws, boards }) {
        let bingos = [];
        let drawIndex = 0;
        let draw = null;

        while (boards.length > 0) {
            draw = draws[drawIndex];
            boards = boards
                .map((board) => this.#markBoard(board, draw))
                .filter((board) => {
                    const bingo = this.#checkBingo(board);

                    if (this.#checkBingo(board)) {
                        bingos.push(board);
                    }

                    return !bingo;
                });

            drawIndex++;
        }

        return this.#getBoardScore(bingos.at(-1), draw);
    }
}

new Day4().solve();
