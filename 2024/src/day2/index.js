import { Day } from "../utils.js";

class Day2 extends Day {
    constructor() {
        super(2);
    }

    preprocess(text) {
        return text
            .split("\n")
            .map((line) => line.split(" ").map((num) => parseInt(num)));
    }

    #isSafe(report, up) {
        let lower = up ? 1 : -3;
        let upper = up ? 3 : -1;

        for (let i = 1; i < report.length; i++) {
            let diff = report[i] - report[i - 1];
            if (diff < lower || diff > upper) return false;
        }

        return true;
    }

    partOne(input) {
        return input.filter((report) => {
            return this.#isSafe(report, report[1] - report[0] > 0);
        }).length;
    }

    partTwo(input) {
        return input.filter((originalReport) => {
            let reports = originalReport.map((_, index) => {
                let newReport = [...originalReport];
                newReport.splice(index, 1);
                return newReport;
            });

            return [...reports, originalReport].some((report) => {
                return this.#isSafe(report, report[1] - report[0] > 0);
            });
        }).length;
    }
}

new Day2().solve();
