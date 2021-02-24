import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import axios from 'axios';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Product } from "../interfaces/product";
import { ProductsService } from "../services/products-service.service";

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let service:ProductsService;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new ProductsService();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should fake a call to get products', () => {
    expect(component).toBeTruthy();
    
    spyOn(service,'getProducts').and.callFake(()=> axios.get("https://run.mocky.io/v3/90489b61-1b1e-44c0-93bf-8ac8826d41da"))
  });




 
});
