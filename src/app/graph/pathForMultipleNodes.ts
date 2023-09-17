 import { shortestPathBruteForce } from "./shortestPathBruteForce";
 import { WeightedNode } from './weidghednode';
 import ShopGraph from "../graph/shopGraph";

 export function pathForMultipleNodes(nodesReference : WeightedNode[]): WeightedNode[] {
        let path : WeightedNode[] = [];

        let nodes = [...nodesReference]

        nodes.unshift(ShopGraph.start); // add starting point (entrance)
        nodes.push(ShopGraph.finish); // add end point (exit)

        for(let i = 0; i < nodes.length - 1; i++) {
            path.pop();
            path = path.concat(shortestPathBruteForce(nodes[i], nodes[i+1]));
        }
        return path;
    }     