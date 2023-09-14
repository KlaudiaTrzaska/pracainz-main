import { WeightedNode } from './weidghednode';

export function shortestPathBruteForce(start: WeightedNode, end: WeightedNode): WeightedNode[] {
  // use a set to keep track of visited nodes and prevent cycles
  const visited = new Set<WeightedNode>();

  // use a queue to keep track of the current path being explored
  const queue: WeightedNode[][] = [[start]];

  // keep track of the shortest path found so far
  let shortestPath: WeightedNode[] | undefined;

  while (queue.length > 0) {
    const path = queue.shift()!;
    const node = path[path.length - 1];

    if (node === end) {
      // if the current path ends at the target node, update the shortest path if necessary


      if (!shortestPath || path.length < shortestPath.length) {
        shortestPath = path;
      }
    } else if (!visited.has(node)) {
      // if the current node has not been visited, explore its neighbors
      visited.add(node);
      for (const edge of node.getEdges()) {
        const neighbor = edge[0];
        // const weight = edge[1];
        const newPath = path.concat([neighbor]);
        queue.push(newPath);
      }
    }
  }

  return shortestPath || [];
}
