import { Day } from "../utils.js";

class Day9 extends Day {
    constructor() {
        super(9);
    }

    preprocess(text) {
        let input = text.split("").map((n) => parseInt(n));
        let disk = [];
        let files = {};
        let fileId = 0;

        for (let i = 0; i < input.length; i++) {
            let isFile = i % 2 === 0;
            let c = isFile ? fileId : ".";

            if (isFile) {
                files[fileId] = {
                    start: disk.length,
                    size: input[i],
                };

                fileId++;
            }

            for (let n = 0; n < input[i]; n++) {
                disk.push(c);
            }
        }

        return { disk, files };
    }

    #getCheckSum(disk) {
        return disk.reduce((sum, curr, i) => {
            return sum + (curr === "." ? 0 : i * curr);
        }, 0);
    }

    partOne({ disk }) {
        for (let i = disk.length - 1; i > 0; i--) {
            let curr = disk[i];
            let firstFree = disk.findIndex((c) => c === ".");
            let lastData = disk.findLastIndex((c) => c !== ".");

            if (lastData < firstFree) break;

            if (curr !== "." && firstFree > -1) {
                disk[firstFree] = curr;
                disk[i] = ".";
            }
        }

        return this.#getCheckSum(disk);
    }

    partTwo({ disk, files }) {
        for (let id = disk.at(-1); id >= 0; id--) {
            let fileInfo = files[id];
            let freeIndex = disk.findIndex((c, i) => {
                if (c !== ".") return false;
                return disk.slice(i, i + fileInfo.size).every((c) => c === ".");
            });

            if (freeIndex <= fileInfo.start) {
                for (let s = 0; s < fileInfo.size; s++) {
                    disk[freeIndex + s] = id;
                    disk[fileInfo.start + s] = ".";
                }
            }
        }

        return this.#getCheckSum(disk);
    }
}

new Day9().solve();
