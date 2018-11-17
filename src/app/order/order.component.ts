import { OrderService } from './order.service';
import { RadioOption } from './../share/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurants/restaurant-detail/shooping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    {label: 'Cartão de Crédito', value: 'CC'},
    {label: 'Dinheiro', value: 'DI'},
    {label: 'CashBack', value: 'CB'}];

    delivery = 10;

    static equalsTo(group: AbstractControl): {[key: string]: boolean} {
      const email = group.get('email');
      const emailConfirmation = group.get('emailConfirmation');
      if (!email || !emailConfirmation) {
        return undefined;
      }
      if (email.value !== emailConfirmation.value) {
        return {emailsNotMatch: true};
      }
      return undefined;
    }

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo});
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(item => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).subscribe((res) => {
      console.log((res));
      console.log((res.id));
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }


}
