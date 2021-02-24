import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from "../../interfaces/product";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @Input() product:Product
  constructor(private viewCtrl:ModalController) { }

  ngOnInit() {
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
