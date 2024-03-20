import { Component, DoCheck, OnChanges, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore);

  itemCount!: number

  ngDoCheck(): void {
    this.itemCount = this.cartStore.getItemCountInCart();
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}