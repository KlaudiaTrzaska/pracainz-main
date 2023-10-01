import { WeightedNode } from './weidghednode';
import { Colors } from "@lib/utils/colors";

class ShopGraph {
    nodes: WeightedNode[];
    start: WeightedNode;
    finish: WeightedNode;

    constructor() {
        this.nodes = [];

        for (let i = 0; i <= 47; i++) {
            const node = new WeightedNode(`${i}`, 3);
            this.nodes.push(node);
        }

        // adding items to nodes
        this.nodes[1].setProductCategory("Wejscie");
        this.nodes[3].setProductCategory("RTV");
        this.nodes[4].setProductCategory("AGD");
        this.nodes[5].setProductCategory("Rosliny");
        this.nodes[12].setProductCategory("Nabial, Jajka");
        this.nodes[13].setProductCategory("Slone Przekaski");
        this.nodes[15].setProductCategory("Ciasta");
        this.nodes[16].setProductCategory("Pieczywo");
        this.nodes[24].setProductCategory("Pokarm dla zwierzat");
        this.nodes[25].setProductCategory("Chemia");
        this.nodes[26].setProductCategory("Kosmetyki");
        this.nodes[27].setProductCategory("Ubrania damskie");
        this.nodes[29].setProductCategory("Ryby,Konserwy");
        this.nodes[31].setProductCategory("Slodycze");
        this.nodes[33].setProductCategory("Mieso,Wedliny");
        this.nodes[34].setProductCategory("Makaron,Ryz");
        this.nodes[35].setProductCategory("Przyprawy,Sosy");
        this.nodes[38].setProductCategory("Ubrania meskie");
        this.nodes[39].setProductCategory("Kawa,Herbata");
        this.nodes[41].setProductCategory("Ubrania dzieciece");
        this.nodes[43].setProductCategory("Zabawki");
        this.nodes[45].setProductCategory("Art.papiernicze");
        this.nodes[47].setProductCategory("Kasy/Wyjscie");

        // polaczenia miedzy nodami:
        this.connectNodeWithMany(this.nodes[1], [2, 23]);
        this.connectNodeWithMany(this.nodes[2], [1, 3, 24]);
        this.connectNodeWithMany(this.nodes[3], [2, 4, 5, 24, 43]);
        this.connectNodeWithMany(this.nodes[4], [3, 5, 6]);
        this.connectNodeWithMany(this.nodes[5], [3, 4, 7]);
        this.connectNodeWithMany(this.nodes[6], [4]);
        this.connectNodeWithMany(this.nodes[7], [5, 8]);
        this.connectNodeWithMany(this.nodes[8], [7, 9, 25]);
        this.connectNodeWithMany(this.nodes[9], [8, 10, 26]);
        this.connectNodeWithMany(this.nodes[10], [9, 11, 27]);
        this.connectNodeWithMany(this.nodes[11], [10, 12, 28]);
        this.connectNodeWithMany(this.nodes[12], [11, 13, 30]);
        this.connectNodeWithMany(this.nodes[13], [12, 14, 30]);
        this.connectNodeWithMany(this.nodes[14], [13, 15]);
        this.connectNodeWithMany(this.nodes[15], [16, 31, 32]);
        this.connectNodeWithMany(this.nodes[16], [15, 17]);
        this.connectNodeWithMany(this.nodes[17], [16, 18]);
        this.connectNodeWithMany(this.nodes[18], [17, 19, 33, 47]);
        this.connectNodeWithMany(this.nodes[19], [18, 20, 34, 47]);
        this.connectNodeWithMany(this.nodes[20], [19, 35, 39, 47]);
        this.connectNodeWithMany(this.nodes[21], [22, 46, 47]);
        this.connectNodeWithMany(this.nodes[22], [21, 23, 44, 47]);
        this.connectNodeWithMany(this.nodes[23], [1, 22, 47]);
        this.connectNodeWithMany(this.nodes[24], [2, 3, 44]);
        this.connectNodeWithMany(this.nodes[25], [8, 43]);
        this.connectNodeWithMany(this.nodes[26], [9, 42]);
        this.connectNodeWithMany(this.nodes[27], [10, 41]);
        this.connectNodeWithMany(this.nodes[28], [11, 29, 38]);
        this.connectNodeWithMany(this.nodes[29], [28, 30, 38]);
        this.connectNodeWithMany(this.nodes[30], [12, 13, 29, 31, 36]);
        this.connectNodeWithMany(this.nodes[31], [15, 30]);
        this.connectNodeWithMany(this.nodes[32], [15, 33, 36]);
        this.connectNodeWithMany(this.nodes[33], [18, 32]);
        this.connectNodeWithMany(this.nodes[34], [19, 36]);
        this.connectNodeWithMany(this.nodes[35], [20, 37]);
        this.connectNodeWithMany(this.nodes[36], [30, 32, 34, 37]);
        this.connectNodeWithMany(this.nodes[37], [35, 36, 39]);
        this.connectNodeWithMany(this.nodes[38], [28, 29, 39, 40]);
        this.connectNodeWithMany(this.nodes[39], [20, 37, 38, 40, 46]);
        this.connectNodeWithMany(this.nodes[40], [38, 39, 41, 45, 46]);
        this.connectNodeWithMany(this.nodes[41], [27, 40, 42]);
        this.connectNodeWithMany(this.nodes[42], [26, 41, 43, 44]);
        this.connectNodeWithMany(this.nodes[43], [3, 25, 42]);
        this.connectNodeWithMany(this.nodes[44], [22, 24, 42, 45]);
        this.connectNodeWithMany(this.nodes[45], [40, 44, 46]);
        this.connectNodeWithMany(this.nodes[46], [21, 39, 40, 45]);



        this.start = this.nodes[1];
        this.finish = this.nodes[47];
        this.nodes.splice(0, 1);
    }

    translateShoppingListToNodeList(shoppingList: string[]): WeightedNode[] {
        this.colorReset();
        const nodesList = [];
        nodesList.push(this.start);
        for (let i = 0; i < shoppingList.length; i++) {
            for (let j = 0; j < this.nodes.length; j++) {
                // jesli znalazl produkt na shoppinglist to dodaj node do nodelist
                if (this.nodes[j].getProductCategory().includes(shoppingList[i])) {
                    this.nodes[j].setColor("#ff0000");
                    nodesList.push(this.nodes[j]);
                    break;
                }
            }
        }
        nodesList.push(this.finish);
        return nodesList;
    }

    connectNodeWithMany(node1: WeightedNode, connnections: number[]) {
        connnections.forEach(element => {
            node1.addEdge(this.nodes[element], 1);
        });
    }

    connectNodesEdges(node1: WeightedNode, node2: WeightedNode) {
        node1.addEdge(node2, 1);
        node2.addEdge(node1, 1);
    }

    colorReset(): void {
        for (const node of this.nodes) {
            node.setColor(Colors.NORMAL);
        }
        this.start.setColor(Colors.START);
        this.finish.setColor(Colors.FINISH);
    }

    colorPath(path: WeightedNode[]): void {
        for (const node of path) {
            if (node.getcolor() == Colors.NORMAL) {
                node.setColor(Colors.CONNECTION);
            }
        }
    }

    pathToString(path: WeightedNode[]): string {
        let result = '';
        for (const node of path) {
            result += node.getId() + " | ";
        }
        this.colorPath(path);
        return result;
    }

    getAllProductCategories() {
        let allProducts = [];
        for (const item of this.nodes) {
            if (item.getProductCategory() != "" && item.getProductCategory() != "Wejscie" && item.getProductCategory() != "Kasy/Wyjscie") {
                allProducts.push(item.getProductCategory());
            }
        }

        return allProducts;
    }

    getNodeByCategory(category: string): WeightedNode | undefined {
        return this.nodes.find(node => node.getProductCategory() === category);
    }
}

export default new ShopGraph();