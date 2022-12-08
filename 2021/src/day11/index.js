import { Day } from "../utils.js";

class Day11 extends Day {
    constructor() {
        super(11);
    }

    preprocess(text) {
        return text
            .split("\n")
            .map((line) => line.split("").map((n) => parseInt(n)));
    }

    partOne(input) {
        const flash = (octos, x, y, flashed = []) => {
            let newFlashed = [...flashed, { x: x, y: y }];
            let newOctos = [...octos];
            newOctos[x][y] = 0;

            for (let ny = y - 1; ny <= y + 1; ny++) {
                for (let nx = x - 1; nx <= x + 1; nx++) {
                    let exists = newFlashed.find((f) => {
                        return f.x === nx && f.y === ny;
                    });

                    if (
                        nx > -1 &&
                        nx < newOctos[0].length &&
                        ny > -1 &&
                        ny < newOctos.length &&
                        nx !== x &&
                        ny !== y &&
                        !exists
                    ) {
                        if (++newOctos[ny][nx] > 9) {
                            newOctos[ny][nx] = 0;

                            let flashResult = flash(
                                newOctos,
                                nx,
                                ny,
                                newFlashed
                            );

                            newFlashed = flashResult.flashed;
                            newOctos = flashResult.octos;

                            /*
                            console.log(
                                `x: ${nx} y: ${ny} v: ${newOctos[ny][nx] + 1}`
                            );
                            */
                        }
                    }
                }
            }

            return { octos: newOctos, flashed: newFlashed };
        };

        let octo = input;

        for (let i = 0; i < 4; i++) {
            octo = octo.map((y) => y.map((x) => x + 1));

            octo.forEach((line, y) => {
                console.log(octo[y]);

                line.forEach((value, x) => {
                    console.log(octo[y][x]);
                    if (octo[y][x] > 9) {
                        let flashResult = flash(octo, x, y);
                        octo = flashResult.octos;
                        console.log(octo[y][x]);
                    }
                });
            });
        }

        return null;
    }

    partTwo(input) {
        return null;
    }
}

new Day11().solve();
