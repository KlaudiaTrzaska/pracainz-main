import { Injectable } from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import {WeightedNode} from "../graph/weidghednode";

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    private network: Network | undefined;

    constructor() { }

    public createGraph(nodes: WeightedNode[], containerId: string): void {
        let xOffset = 1;
        let yOffset = 1;
        const step = 10;

        const edges = this.createEdges(nodes);
        const nodeDataSet = new DataSet(nodes.map((node) => ({
            id: node.getId(),
            label: node.getId(),
            fixed: (node as any).fixed,
            color: node.getcolor(),
            // x: xOffset++ * step,
            // y: yOffset++ * step
            x: (+node.getId()) * step,
            y: ( (+node.getId() % 10 )) * step
        })));
        const edgeDataSet = new DataSet(edges);
        const container = document.getElementById(containerId);

        if (container) {
            const options = {
                nodes: {
                    shape: 'circle',
                },
                layout: {
                    randomSeed: 2, // Set a fixed random seed
                //     hierarchical: {
                //         // enabled: true,
                //         levelSeparation: 150,
                //         nodeSpacing: 100,
                //         treeSpacing: 200,
                //         direction: 'UD', // Up-Down
                //         sortMethod: 'directed', // Sort based on edge directions
                //         shakeTowards: 'roots', // Prevent rotation
                //     },
                },
                // improvedLayout: false, // Disable improved layout algorithm
                // randomSeed: 2, // Set a fixed random seed
            };

            const data = {
                nodes: nodeDataSet,
                edges: edgeDataSet,
            };

            this.network = new Network(container, data, options);
        }
    }

    private createEdges(nodes: WeightedNode[]): any[] {
        const edges = [];
        for (const node of nodes) {
            const connectedNodes = node.getEdges();
            for (const [connectedNode, weight] of connectedNodes) {
                edges.push({
                    from: node.getId(),
                    to: connectedNode.getId(),
                    label: weight.toString(),
                });
            }
        }
        return edges;
    }
}