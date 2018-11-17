import { MEAT_API } from './../app.api';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CartItem } from './../restaurants/restaurant-detail/shooping-cart/cart-item.model';
import { ShoopingCartService } from './../restaurants/restaurant-detail/shooping-cart/shooping-cart.service';
import { Injectable } from "@angular/core";
import { Order } from './order.model';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoopingCartService, public http: Http) {}

  itemsValue(): number {
    return this.cartService.total();
  }

  cartItems(): CartItem[] {
    return this.cartService.itens;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  checkOrder(order: Order): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${MEAT_API}/orders`,
                          JSON.stringify(order),
                          new RequestOptions({headers: headers}))
        .map(response => response.json());
  }

  clear() {
    this.cartService.clear();
  }
}
