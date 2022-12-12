import { Day } from "../utils.js";

class Day12 extends Day {
    constructor() {
        super(12);
    }

    preprocess(text) {
        let input = text.split("\n").map((line) => line.split(""));
        let graph = {};
        let start = "";
        let end = "";
        let lowPoints = [];

        const getHeight = (x, y) => {
            if (input[y][x] === "S") return 0;
            if (input[y][x] === "E") return 25;

            return input[y][x].charCodeAt() - 97;
        };

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                let key = `${x}-${y}`;
                let height = getHeight(x, y);
                let adjecent = [];

                if (input[y][x] === "S") start = key;
                else if (input[y][x] === "E") end = key;
                else if (input[y][x] === "a") lowPoints.push(key);

                if (!graph[key]) graph[key] = [];

                if (x > 0) adjecent.push({ x: x - 1, y: y });
                if (x < input[0].length - 1) adjecent.push({ x: x + 1, y: y });
                if (y > 0) adjecent.push({ x: x, y: y - 1 });
                if (y < input.length - 1) adjecent.push({ x: x, y: y + 1 });

                adjecent.forEach((a) => {
                    if (getHeight(a.x, a.y) <= height + 1) {
                        graph[key].push(`${a.x}-${a.y}`);
                    }
                });
            }
        }

        return { lowPoints, input, graph, start, end };
    }

    #selectNode(distances, visited) {
        let shortest = null;

        for (let node in distances) {
            let isShortest = !shortest || distances[node] < distances[shortest];

            if (isShortest && !visited.includes(node)) {
                shortest = node;
            }
        }

        return shortest;
    }

    #dijkstra(graph, start) {
        let distances = graph[start].reduce((prev, curr) => {
            return { ...prev, [curr]: 1 };
        }, {});

        let visited = [];
        let node = this.#selectNode(distances, visited);

        while (node) {
            let children = graph[node];
            let distance = distances[node];

            for (let child of children) {
                let newDistance = distance + 1;

                if (!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                }
            }

            visited.push(node);
            node = this.#selectNode(distances, visited);
        }

        return distances;
    }

    partOne({ graph, start, end }) {
        const distances = this.#dijkstra(graph, start);

        return distances[end];
    }

    partTwo({ lowPoints, graph, start, end }) {
        const newGraph = { ...graph, [start]: [...graph[start], ...lowPoints] };
        const distances = this.#dijkstra(newGraph, start);

        return distances[end] - 1;
    }
}

new Day12().solve();
