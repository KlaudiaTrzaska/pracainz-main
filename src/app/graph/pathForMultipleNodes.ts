 import { shortestPathBruteForce } from "./shortestPathBruteForce";
 import { WeightedNode } from './weidghednode';

 export function pathForMultipleNodes(nodes : WeightedNode[]): WeightedNode[] {
        let path : WeightedNode[] = [];

        for(let i = 0; i < nodes.length - 1; i++) {
            path.pop();
            path = path.concat(shortestPathBruteForce(nodes[i], nodes[i+1]));
        }
        return path;
    }     