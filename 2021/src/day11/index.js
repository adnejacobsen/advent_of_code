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

    #flash(octos, x, y, flashed) {
        let newOctos = [...octos];
        let newFlashed = { ...flashed };

        newOctos[y][x] = 0;
        newFlashed[`${y}-${x}`] = true;

        for (let ny = y - 1; ny <= y + 1; ny++) {
            if (newOctos[ny]) {
                for (let nx = x - 1; nx <= x + 1; nx++) {
                    if (
                        newOctos[ny][nx] !== undefined &&
                        !newFlashed[`${ny}-${nx}`]
                    ) {
                        newOctos[ny][nx]++;

                        if (newOctos[ny][nx] > 9) {
                            let flash = this.#flash(
                                newOctos,
                                nx,
                                ny,
                                newFlashed
                            );

                            newOctos = flash.octos;
                            newFlashed = flash.flashed;
                        }
                    }
                }
            }
        }

        return { octos: newOctos, flashed: newFlashed };
    }

    #simulate(input, callback) {
        let octos = [...input];
        let done = false;
        let step = 0;

        while (!done) {
            let flashed = {};

            for (let y = 0; y < input.length; y++) {
                for (let x = 0; x < input[0].length; x++) {
                    if (!flashed[`${y}-${x}`]) {
                        octos[y][x]++;

                        if (octos[y][x] > 9) {
                            flashed[`${y}-${x}`] = true;
                            let flash = this.#flash(octos, x, y, flashed);

                            octos = flash.octos;
                            flashed = flash.flashed;
                        }
                    }
                }
            }

            callback(step, octos, flashed, () => {
                done = true;
            });

            step++;
        }
    }

    partOne(input) {
        let total = 0;

        this.#simulate(input, (step, octos, flashed, done) => {
            if (step === 100) {
                done();
            } else {
                total += Object.keys(flashed).length;
            }
        });

        return total;
    }

    partTwo(input) {
        let syncStep = null;

        this.#simulate(input, (step, octos, flashed, done) => {
            if (Object.keys(flashed).length === 100) {
                syncStep = step + 1;
                done();
            }
        });

        return syncStep;
    }
}

new Day11().solve();
