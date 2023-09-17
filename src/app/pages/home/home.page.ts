import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { Subject, takeUntil } from 'rxjs';

import GeneticAlgorithmHelper from '../../util/genetic';
import {WeightedNode} from "../../graph/weidghednode";
import {GraphService} from "../../visual/visualiser";
import ShopGraph from "../../graph/shopGraph";
import {FormsModule} from "@angular/forms";
import {pathForMultipleNodes} from "../../graph/pathForMultipleNodes";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, OnDestroy {
  currentTheme!: AppTheme | null;

  private _destroy$ = new Subject();
  myResult: string | undefined;
  products = ShopGraph.getAllProductCategories();

  selectedProduct: string = '';
  expandedProducts: string[] = [];
  shoppingList: WeightedNode[] = []; // lista zakupów - którę węzły musza się znaleźc na ścieze
  shoppingPath: WeightedNode[] = []; // ściezka do zakupów - łącznie z węzłami pośrednimi

  addToShoppingList(): void {
    if (this.selectedProduct != "") {
      console.log('Selected Product:', this.selectedProduct);
      this.expandedProducts.push(this.selectedProduct);
      this.addToShoppingListByCategory(this.selectedProduct);
    }
  }

  constructor(private _themeService: ThemeService) {}

  ngOnInit(): void {
    this._themeService.currentTheme$
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme) => (this.currentTheme = theme));

    /////////////
      // this.addToShoppingListByCategory('Wejscie');

      this.addToShoppingListByCategory('AGD');
      this.addToShoppingListByCategory('Slodycze');
      this.addToShoppingListByCategory('Chemia');
      this.addToShoppingListByCategory('Kawa,Herbata');
  
      // this.addToShoppingListByCategory('Kasy/Wyjscie');
  
      this.myResult = this.myFunction();
      // this.graphService.createGraph(this.nodes, 'network-container');
      // this.drawGraph();
      // this.loadArrayFromLocalStorage();

  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }

  update(): void {
    console.log('Expanded Products:', this.expandedProducts);

    let shoppingListWithExits = this.shoppingList;

    this.drawGraph();

  }

  //////

  // constructor(private graphService: GraphService) {

  // }


  myFunction() {
    // function logic here
    // return GeneticAlgorithmHelper.myFunction();
    // return "Hello world!";
    let list = '';
    this.shoppingList.forEach(function (item) {
      list += " "+item.getProductCategory();
    });
    return list;
  }


  drawGraph() {
    this.clearAllLines();
    this.colorShoppingNodes();
    this.connectCirclesWithLines();
  }

  removeItem(index: number): void {
    this.expandedProducts.splice(index, 1);
    this.shoppingList.splice(index, 1);
  }

  saveArrayToLocalStorage(): void {
    // localStorage.setItem('listaZakupow', JSON.stringify(this.expandedProducts));
    this.drawGraph();
  }

  loadArrayFromLocalStorage() {
    const json = localStorage.getItem('listaZakupow');
    if (json) {
      this.expandedProducts = JSON.parse(json);
      for(let category of this.expandedProducts){
        this.addToShoppingListByCategory(category);
      }
      this.drawGraph();
    }
  }

  addToShoppingListByCategory(category: string) {
    this.shoppingList.push(ShopGraph.getNodeByCategory(category)!);
    this.expandedProducts.push(category);
  }

  // getShoppingListFromStringArray(shoppingList: string[]) {
  //   let nodeList : WeightedNode[] = [];
  //   for (let product in this.products){
  //     if (shoppingList.includes(product.getProductCategory()  ))
  //
  //     }
  //   }
  // }

  connectCirclesWithLines() {
    const circleElements = document.querySelectorAll('.red-circle');
    const overlay = document.querySelector('.circle-overlay') as HTMLElement;
    const image = document.querySelector('.background-image') as HTMLImageElement;

    const shoppingPathLines = pathForMultipleNodes([...this.shoppingList]);


    // shoppingPathLines.forEach(function (item) {
    //   console.log(`${item.getId()} item: ` , item.getProductCategory());
    // });

    for ( let i = 0; i < shoppingPathLines.length-1; i++){
      const startIndex = shoppingPathLines[i].getId();
      const endIndex = +shoppingPathLines[i+1].getId();

      const startCircle = document.querySelector(`[id="${startIndex}"]`);
      const endCircle =document.querySelector(`[id="${endIndex}"]`);


      console.log(`drawing for ${startIndex} -> ${endIndex}`);
      console.log(`HTML: ${startCircle} -> ${endCircle}`);


      this.drawConnectingLine(startCircle as HTMLElement, endCircle as HTMLElement, image, overlay);

    }

  }

  drawConnectingLine (startPoint: HTMLElement, endPoint: HTMLElement, canvas: HTMLElement, parentOverlay: HTMLElement ) {
  // console.log(`drawConnectingLine for: ${startPoint} -> ${endPoint}`);


    const dx = endPoint.offsetLeft - startPoint.offsetLeft;
    const dy = endPoint.offsetTop - startPoint.offsetTop;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const startXPercentage = ( (startPoint.offsetLeft + startPoint.offsetWidth/2) / canvas.offsetWidth) * 100;
    const startYPercentage = ( (startPoint.offsetTop + startPoint.offsetHeight/2 ) / canvas.offsetHeight) * 100;

    const line = document.createElement('div');
    line.style.width = `${distance}px`;
    line.style.height = '4px';
    line.style.backgroundColor = 'green'; // Change line color as needed
    line.classList.add('line');
    line.style.transformOrigin = `top left`;
    line.style.left = `${startXPercentage}%`;
    line.style.top = `${startYPercentage}%`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.position = 'absolute';

    parentOverlay.appendChild(line);
  }

  clearAllLines() {
    const lineElements = document.querySelectorAll('.line');

    lineElements.forEach(function (lineElement) {
      lineElement.remove();
    });

    const circleElements = document.querySelectorAll<HTMLElement>('.red-circle') ;
    circleElements.forEach(function (circleElement) {
      circleElement.style.backgroundColor = 'black'; // Change line color as needed
    });
  }

  colorShoppingNodes() {
    this.shoppingList.forEach( function (shoppingElement) {
      const shoppingCircle = document.querySelector<HTMLElement>(`[id="${shoppingElement.getId()}"]`)!;
      shoppingCircle.style.backgroundColor = 'red';
    });
  }


  ngAfterViewInit() {
    // this.addToShoppingListByCategory('AGD');
    // this.addToShoppingListByCategory('Slodycze');
    // this.addToShoppingListByCategory('Chemia');

    // this.connectNodes('12', '24');
  }

}



