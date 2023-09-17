import { WeightedNode } from '../graph/weidghednode';
import ShopGraph from '../graph/shopGraph';
import { shortestPathBruteForce } from '../graph/shortestPathBruteForce';
import { pathForMultipleNodes } from '../graph/pathForMultipleNodes';

class GeneticAlgorithmHelper {

    updateList(productList: string[]): string {
        const nodesList = ShopGraph.translateShoppingListToNodeList(productList);
        const path = pathForMultipleNodes(nodesList);

        return ShopGraph.pathToString(path);
    }

    // myFunction(): string {

    //     const shoppingList = ["Zabawki", "Pieczywo", "Ciasta"];
    //     // const shoppingList = ["Zabawki", "Pieczywo", "Ciasta", "Zabawki"];
    //     // const shoppingList = ["Zabawki", "Pieczywo"];
    //     const nodesList = ShopGraph.translateShoppingListToNodeList(shoppingList);
    //     const path = pathForMultipleNodes(nodesList);


    //     return ShopGraph.pathToString(path);
    // }
}
export default new GeneticAlgorithmHelper();