import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit{
  cartItems: Product[] =[];
  totalPrice: number =0;
  constructor(
    private cartService: CartService
  ){}
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items =>{
      this.cartItems = items? items:[];
      this.totalPrice = this.getTotalPrice();
    })
  }
  getTotalPrice():number{
    let total = 0;
    for(let item of this.cartItems){
      total += item.price;
    }
    return total;
  }
  clearCart():void{
    this.cartService.clearCart().subscribe();
  }
  checkOut():void{
     this.cartService.checkOut(this.cartItems).subscribe();
  }

}
