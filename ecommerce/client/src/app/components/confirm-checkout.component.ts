import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartStore } from '../cart.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, Order } from '../models';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {

  // TODO Task 3
  private cartStore = inject(CartStore);
  private productSvc = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  itemCount!: number;
  checkoutForm!: FormGroup;
  cart!: Cart;
  cartTotal!: number;
  checkoutSub?: Subscription;

  ngOnInit() {
    this.itemCount = this.cartStore.getItemCountInCart();
    this.cart = this.cartStore.getCart()!;
    this.cartTotal = this.getCartTotal(this.cart);
    if (!this.itemCount) {
      alert("Your cart is empty!");
    }

    this.checkoutForm = this.createForm();
  }

  ngOnDestroy() {
      this.checkoutSub?.unsubscribe();
  }

  getCartTotal(cart: Cart) {
    let sum = 0;
    cart.lineItems.forEach((item) => {
      sum += item.price;
    })
    return sum;
  }

  createForm() {
    return this.checkoutForm = this.fb.group({
      name: this.fb.control<string>("", [Validators.required]),
      address: this.fb.control<string>("", [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false, [Validators.required]),
      comments: this.fb.control<string>(""),
    });
  }

  onSubmit() {
    let checkoutCartItems: any[] = [];
    this.cart.lineItems.forEach((i) => {
      checkoutCartItems.push({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        productId: i.prodId
      })
    })
    let checkoutCart = {
      // orderId: null,
      // date: null,
      ...this.checkoutForm.value,
      cart: { lineItems: checkoutCartItems }
    } as Order;

    this.checkoutSub = this.productSvc.checkout(checkoutCart)
    .subscribe({
      next: () => {
        this.cartStore.clearCart();
        this.router.navigate(["/"]);
      },
      error: (err) => alert(err.error.message)
    })
  }
}
