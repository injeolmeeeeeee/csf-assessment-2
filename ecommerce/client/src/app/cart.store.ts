
// TODO Task 2

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { JsonPipe } from "@angular/common";

// Use the following class to implement your store
@Injectable()
export class CartStore {
    addItemToCart(item: LineItem) {
        let cartFromStorage = localStorage.getItem("cart");
        if (cartFromStorage) {
            let cart = JSON.parse(cartFromStorage) as Cart;
            let itemIndex = cart.lineItems.findIndex((i) => i.name == item.name);
            if (itemIndex != -1) {
                cart.lineItems[itemIndex].quantity += item.quantity;
            } else {
                cart.lineItems.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            let cart = { lineItems: [item] };
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    getCart() {
        let cartFromStorage = localStorage.getItem("cart");
        if (cartFromStorage) {
            return JSON.parse(cartFromStorage) as Cart;
        }
        return null;
    }

    getItemCountInCart() {
        let cartFromStorage = localStorage.getItem("cart");
        if (cartFromStorage) {
            return (JSON.parse(cartFromStorage) as Cart).lineItems.length;
        }
        return 0;
    }

    clearCart() {
        localStorage.removeItem("cart");
    }
}
