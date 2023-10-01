import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { Subject } from 'rxjs';

import { WeightedNode } from "../../graph/weidghednode";
import ShopGraph from "../../graph/shopGraph";
import { FormsModule } from "@angular/forms";
import { findPath } from "../../graph/findPath";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, OnDestroy {
  currentTheme!: AppTheme | null;

  private _destroy$ = new Subject();
  products = ShopGraph.getAllProductCategories();

  selectedProduct: string = ''; // wybrany produkt z formularza na stronie do dodania do listy
  shoppingList: WeightedNode[] = []; // lista zakupów - którę węzły musza się znaleźc na ścieze
  shoppingPath: WeightedNode[] = []; // ściezka do zakupów - łącznie z węzłami pośrednimi


  constructor(private _themeService: ThemeService) { }

  ngOnInit(): void {
    this.loadArrayFromLocalStorage();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }

  drawGraph() {
    // start counting
    const start = new Date().getTime();

    // function
    this.clearAllLines();
    this.connectCirclesWithLines();
    this.colorShoppingNodes();

    // finish counting and results
    const end = new Date().getTime();
    const time = end - start;
    console.log('Execution time: ' + time + ' ms');
  }

  removeItem(index: number): void {
    this.shoppingList.splice(index, 1);
  }

  saveArrayToLocalStorage(): void {
    localStorage.setItem('listaZakupow', JSON.stringify(this.shoppingList.map(a => a.getProductCategory())));
  }

  loadArrayFromLocalStorage() {
    const json = localStorage.getItem('listaZakupow');
    if (json) {
      for (let category of JSON.parse(json)) {
        this.addToShoppingListByCategory(category);
      }
    }
  }

  addToShoppingListByCategory(category: string) {
    const node = ShopGraph.getNodeByCategory(category)!;
    if (!this.shoppingList.includes(node)) {
      this.shoppingList.push(node);
    }
  }

  addToShoppingList(): void {
    if (this.selectedProduct != "") {
      this.addToShoppingListByCategory(this.selectedProduct);
    }
  }

  connectCirclesWithLines() {
    const circleElements = document.querySelectorAll('.red-circle');
    const overlay = document.querySelector('.circle-overlay') as HTMLElement;
    const image = document.querySelector('.background-image') as HTMLImageElement;

    // const shoppingPathLines = pathForMultipleNodes(this.shoppingList);
    const shoppingPathLines = findPath(this.shoppingList);



    for (let i = 0; i < shoppingPathLines.length - 1; i++) {
      const startIndex = shoppingPathLines[i].getId();
      const endIndex = +shoppingPathLines[i + 1].getId();

      const startCircle = document.querySelector(`[id="${startIndex}"]`);
      const endCircle = document.querySelector(`[id="${endIndex}"]`);

      this.drawConnectingLine(startCircle as HTMLElement, endCircle as HTMLElement, image, overlay);

    }

  }

  drawConnectingLine(startPoint: HTMLElement, endPoint: HTMLElement, canvas: HTMLElement, parentOverlay: HTMLElement) {
    const dx = endPoint.offsetLeft - startPoint.offsetLeft;
    const dy = endPoint.offsetTop - startPoint.offsetTop;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const startXPercentage = ((startPoint.offsetLeft + startPoint.offsetWidth / 2) / canvas.offsetWidth) * 100;
    const startYPercentage = ((startPoint.offsetTop + startPoint.offsetHeight / 2) / canvas.offsetHeight) * 100;

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

    const circleElements = document.querySelectorAll<HTMLElement>('.red-circle');
    circleElements.forEach(function (circleElement) {
      circleElement.style.backgroundColor = 'black'; // Change line color as needed
    });
  }

  colorShoppingNodes() {
    this.shoppingList.forEach(function (shoppingElement) {
      const shoppingCircle = document.querySelector<HTMLElement>(`[id="${shoppingElement.getId()}"]`)!;
      shoppingCircle.style.backgroundColor = 'red';
    });
  }

}



