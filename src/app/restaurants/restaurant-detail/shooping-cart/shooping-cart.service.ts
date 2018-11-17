import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoopingCartService {

  itens: CartItem[] = []

  clear() {
    this.itens = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.itens.find((mitem) => mitem.menuItem === item);
    if(foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.itens.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.itens.splice(this.itens.indexOf(item), 1);
  }

  removeMenuItem(item: MenuItem) {
    let foundItem = this.itens.find((mitem) => mitem.menuItem === item);
    if(foundItem) {
      this.decreaseQty(foundItem);
    } else {
      this.itens.splice(this.itens.indexOf(foundItem), 1);
    }
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    if(item.quantity === 1) {
      this.removeItem(item);
    } else {
      item.quantity = item.quantity - 1;
    }
  }


  total(): number {
    return this.itens
            .map((item) => item.value())
            .reduce((prev, value) => prev + value, 0);
  }
}
