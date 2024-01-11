import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart, CartItem } from '../../../models/cart';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  cart: Cart = new Cart();
  addresses: any[] = [];
  constructor(private cartService: CartService,
    private addressService: AddressService) {
    
  }

  ngOnInit(): void {
    this.getCart();
    this.getAddresses();
  }

  onAddOne(item: CartItem) {
    this.cartService.addOne(item.product._id as string).subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error)
    })
  }

  onDeleteOne(item: CartItem) {
    this.cartService.deleteOne(item.product._id as string).subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error)
    })
  }

  onDeleteItem(item: CartItem) {
    this.cartService.deleteItem(item.product._id as string).subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error)
    })
  }

  private getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error:(error) => console.error(error)
    })
  }

  private getAddresses() {
    this.addressService.getAddresses().subscribe({
      next: (res) => this.addresses = res,
      error: (err) => console.error(err)
    })
  }

  get packagingFee() {
    return this.cart.totalItems ? this.cart.totalItems * 2 : 0;
  }

  get totalFee() {
    const totalPrice = this.cart.totalPrice + 5 + this.packagingFee + 2
    return totalPrice ? totalPrice : 0;
  }
}
