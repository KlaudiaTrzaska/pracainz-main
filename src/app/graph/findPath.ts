import { shortestPathBruteForce } from "./shortestPathBruteForce";
import { WeightedNode } from './weidghednode';
import ShopGraph from "../graph/shopGraph";

export function findPath(nodesReference: WeightedNode[]): WeightedNode[] {
    let path: WeightedNode[] = [];

    let nodes = [...nodesReference];

    nodes.sort((a, b) => findDistanceFromStart(a) - findDistanceFromStart(b));

    nodes.unshift(ShopGraph.start); // add starting point (entrance)
    nodes.push(ShopGraph.finish); // add end point (exit)

    for (let i = 0; i < nodes.length - 1; i++) {
        // Function to find the shortest path between two nodes
        const findShortestPath = (start: WeightedNode, end: WeightedNode): WeightedNode[] => {
            const visited = new Set<WeightedNode>();
            const queue: WeightedNode[][] = [[start]];
            let shortestPath: WeightedNode[] | undefined;

            while (queue.length > 0) {
                const path = queue.shift()!;
                const node = path[path.length - 1];

                if (node === end) {
                    if (!shortestPath || path.length < shortestPath.length) {
                        shortestPath = path;
                    }
                } else if (!visited.has(node)) {
                    visited.add(node);
                    for (const edge of node.getEdges()) {
                        const neighbor = edge[0];
                        const newPath = path.concat([neighbor]);
                        queue.push(newPath);
                    }
                }
            }

            return shortestPath || [];
        };

        const partialPath = findShortestPath(nodes[i], nodes[i + 1]);
        path = path.concat(partialPath);
    }

    return path;
}

// helper
function findDistanceFromStart(node: WeightedNode) {
    return shortestPathBruteForce(node, ShopGraph.start).length;
}

function findDistanceToExit(node: WeightedNode) {
    return shortestPathBruteForce(node, ShopGraph.finish).length;
}
