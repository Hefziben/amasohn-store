import { Injectable } from '@angular/core';
import { Product } from "../interfaces/product";
import { environment } from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
products:Product[];
  constructor() { }



getProducts(){
return axios.get<Product[]>(`${environment.api}`);

}

}
