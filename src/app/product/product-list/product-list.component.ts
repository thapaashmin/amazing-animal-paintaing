import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  constructor(
    private productService: ProductService
  ){

  }
  products: Product[] =[];
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products =>{
      this.products = products? products:[];
    })
  }
}
