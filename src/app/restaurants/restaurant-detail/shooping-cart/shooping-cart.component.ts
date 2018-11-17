import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { ShoopingCartService } from './shooping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-shooping-cart',
  templateUrl: './shooping-cart.component.html'
})
export class ShoopingCartComponent implements OnInit {

  constructor(private shoopingCartService: ShoopingCartService) { }

  ngOnInit() {
  }

  items(): CartItem[] {
    return this.shoopingCartService.itens;
  }

  total(): number {
    return this.shoopingCartService.total();
  }

  clear() {
    this.shoopingCartService.clear();
  }

  removeItem(item: CartItem) {
    this.shoopingCartService.removeItem(item);
  }

  addItem(item: MenuItem) {
    this.shoopingCartService.addItem(item);
  }

}
