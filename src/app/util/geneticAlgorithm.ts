// import GeneticAlgorithm from 'geneticalgorithm';
// import {WeightedNode} from '../graph/weidghednode';
// import ShopGraph from '../graph/shopGraph';


// // Define the graph
// // const startNode = new WeightedNode('A');
// // const bNode = new WeightedNode('B');
// // const cNode = new WeightedNode('C');
// // const dNode = new WeightedNode('D');
// // const endNode = new WeightedNode('E');

// // startNode.addEdge(bNode, 3);
// // startNode.addEdge(cNode, 2);
// // bNode.addEdge(dNode, 2);
// // cNode.addEdge(dNode, 4);
// // dNode.addEdge(endNode, 3);

// // Define the fitness function for the genetic algorithm
// function fitness(chromosome: number[]) {
//   let currentNode = ShopGraph.start;
//   let distance = 0;
//   for (const gene of chromosome) {
//     const edges = currentNode.getEdges();
//     // const nextNode = edges[gene].node;
//     const nextNode =  [...edges.keys()][gene];
//     // distance += edges[gene].weight;
//     distance += [...edges.values()][gene];
//     currentNode = nextNode;
//   }
//   distance += 1; //currentNode.getDistanceTo(ShopGraph.finish);
//   return -distance; // We want to minimize the distance, so return the negative value
// }

// // Define the genetic algorithm parameters
// const populationSize = 50;
// const generations = 1000;
// const crossoverProbability = 0.8;
// const mutationProbability = 0.2;

// // Define the genetic algorithm object
// const ga = GeneticAlgorithm({
//   mutation: (chromosome: number[]) => {
//     // Swap two genes
//     const index1 = Math.floor(Math.random() * chromosome.length);
//     const index2 = Math.floor(Math.random() * chromosome.length);
//     const temp = chromosome[index1];
//     chromosome[index1] = chromosome[index2];
//     chromosome[index2] = temp;
//     return chromosome;
//   },
//   crossover: (parent1: number[], parent2: number[]) => {
//     // Partially-mapped crossover
//     const child = parent1.slice();
//     const startIndex = Math.floor(Math.random() * parent1.length);
//     const endIndex = Math.floor(Math.random() * parent1.length);
//     for (let i = startIndex; i <= endIndex; i++) {
//       const gene = parent2[i];
//       const index = child.indexOf(gene);
//       const temp = child[i];
//       child[i] = gene;
//       child[index] = temp;
//     }
//     return child;
//   },
// });

// // Run the genetic algorithm
// const result = ga.evolve({
//   population: new Array(populationSize).fill(null).map(() =>
//     new Array(startNode.getEdges().length).fill(null).map((_, i) => i)
//   ),
//   fitnessFunction: fitness,
//   iterations: generations,
//   crossoverProbability,
//   mutationProbability,
// });

// // Print the result
// const bestChromosome = result.population[result.population.length - 1].entity;
// let currentNode = startNode;
// let path = '';
// let distance = 0;
// for (const gene of bestChromosome) {
//   const edges = currentNode.getEdges();
//   const nextNode = edges[gene].node;
//   const weight = edges[gene].weight;
//   path += `${currentNode.getName()} -> `;
//   distance += weight;
//   currentNode = nextNode;
// }
// distance += currentNode.getDistanceTo(endNode);
// path += `${currentNode.getName()}`;
// console.log(`Shortest path: ${path}`);
// console.log(`Distance: ${distance}`);
