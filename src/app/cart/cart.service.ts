import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private pathUrl = environment.apiUrl+"/cart";
  constructor(
    private http : HttpClient
  ) { }

  addToCart(product:Product):Observable<Product>{
   return this.http.post<Product>(this.pathUrl,product);
  }
  getCartItems():Observable<Product[]>{
    return this.http.get<Product[]>(this.pathUrl);
  }
  clearCart():Observable<void>{
    return this.http.delete<void>(this.pathUrl);
  }
  checkOut(product:Product[]):Observable<Product[]>{
    return this.http.post<Product[]>(environment.apiUrl+"/checkout",product);
  }
}
