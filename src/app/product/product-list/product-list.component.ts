import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ){

  }
  products: Product[] =[];
  filteredProduct: Product[]=[];
  sortOrder ="";
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products =>{
      this.products = products? products:[];
      this.filteredProduct = products;
    })
  }
  addToCart(product:Product):void{
    this.cartService.addToCart(product).subscribe({
      next: () =>{
        this.snackbar.open(product.name +" is added to cart!", "",{
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }
  applyFilter(event:Event):void{
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    this.filteredProduct = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
    this.sortProduct(this.sortOrder);
  }
  sortProduct(sortValue: string){
    this.sortOrder = sortValue;
    if(this.sortOrder === 'priceLowHigh'){
      this.filteredProduct.sort((a,b) => a.price - b.price);
    }
    else if(this.sortOrder === 'priceHighLow'){
      this.filteredProduct.sort((a,b) => b.price - a.price);
    }
  }
}
