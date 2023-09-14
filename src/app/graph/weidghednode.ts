export class WeightedNode {
    private id: string;
    private weight: number;
    private edges: Map<WeightedNode, number>;
    private shopitem: string;
    private color: string;
  
    constructor(id: string, weight: number, shopitem = "", color = "#ADD8E6") {
      this.id = id;
      this.weight = weight;
      this.edges = new Map();
      this.shopitem = shopitem;
      this.color = color;
    }

    public getcolor(): string {
        return this.color;
    }

    public setColor(value: string) {
        this.color = value;
    }

    public setProductCategory(shopitem: string): void {
      this.shopitem = shopitem;
    }

    public getProductCategory(): string {
      return this.shopitem;
    }
  
    public getId(): string {
      return this.id;
    }
  
    public getWeight(): number {
      return this.weight;
    }
  
    public getEdges(): Map<WeightedNode, number> {
      return this.edges;
    }
  
    public addEdge(node: WeightedNode, weight: number): void {
      this.edges.set(node, weight);
    }
  
    public removeEdge(node: WeightedNode): void {
      this.edges.delete(node);
    }
  
    public hasEdge(node: WeightedNode): boolean {
      return this.edges.has(node);
    }
  
    public getEdgeWeight(node: WeightedNode): number | undefined {
      return this.edges.get(node);
    }
  }
  