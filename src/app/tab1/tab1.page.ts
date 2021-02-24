import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products-service.service';
import { Product } from '../interfaces/product';
import { ModalController, NavParams } from '@ionic/angular';
import { EventService } from '../services/event-service';
import { ProductDetailsPage } from '../modals/product-details/product-details.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  products: Product[];
  country: string = 'Colombia';
  language: string = 'EN';
  selectedProducts: Product[];
  displayProducts: Product[];
  sortBy: string = 'none';
  category: string = 'none';
  search: string;
  productFound: boolean = true;
  countries = [
    {
      name: 'USA',
    },
    {
      name: 'Colombia',
    },
  ];
  sorts = [
    {
      title: 'lowest price',
      label_EN: 'lowest price',
      label_ES: 'más barato',
    },
    {
      type: 'highest price',
      label_EN: 'highest price',
      label_ES: 'más caro',
    },
    {
      type: 'best selling',
      label_EN: 'best selling',
      label_ES: 'más vendido',
    },
  ];
  categories = [];

  constructor(
    private service: ProductsService,
    public eventService: EventService,
    private modalController: ModalController  ) {
    this.eventService.publish({ language: this.language });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().then((data) => {
      this.products = data.data;
      this.filterProducts(this.country);
    }).catch(err =>{
      console.log(err);
      
    });
  }

  filterProducts(country) {
    this.selectedProducts = this.products.filter(
      (product) => product.country == country
    );
    this.displayProducts = this.selectedProducts;
    this.getCategories(this.selectedProducts);
  }

  getCategories(products) {
    const tempArray = products.map((product) => {
      return {
        name: product.category,
        label_EN: product.category,
        label_ES: '',
      };
    });
    this.removeDuplicates(tempArray);
  }
  removeDuplicates(array) {
    this.categories = array.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    this.addSpanishLabels(this.categories);
  }

  addSpanishLabels(categories) {
    for (const category of categories) {
      if (category.name == 'jewelery') {
        category.label_ES = 'joyas';
      }
      if (category.name == 'electronics') {
        category.label_ES = 'electrónica';
      }
      if (category.name == 'women clothing') {
        category.label_ES = 'ropa de dama';
      }
      if (category.name == 'men clothing') {
        category.label_ES = 'ropa de caballero';
      }
    }
  }

  select(e) {
    this.country = e.detail.value;
    this.category = 'none';
    this.filterProducts(this.country);
    this.sortProducts(this.sortBy);
  }

  changeLanguage() {
    if (this.language == 'EN') {
      this.language = 'ES';
    } else {
      this.language = 'EN';
    }
    this.eventService.publish({ language: this.language });
  }
  filterProductsByCategory() {
    if (this.category == 'none') {
      this.selectedProducts = this.products.filter(
        (product) => product.country == this.country
      );
      this.displayProducts = this.selectedProducts;
    } else {
      this.selectedProducts = this.products.filter(
        (product) =>
          product.category == this.category && product.country == this.country
      );
      this.displayProducts = this.selectedProducts;
    }
  }
  sort(event) {
    this.sortBy = event.detail.value;
    this.sortProducts(this.sortBy);
  }
  sortProducts(value) {
    if (value == 'lowest price') {
      this.displayProducts = this.selectedProducts.sort(
        this.compareValues('price', 'asc')
      );
    }
    if (value == 'highest price') {
      this.displayProducts = this.selectedProducts.sort(
        this.compareValues('price', 'desc')
      );
    }
    if (value == 'best selling') {
      this.displayProducts = this.selectedProducts.sort(
        this.compareValues('best_selling', 'desc')
      );
    }
  }

  onSearchChange(event) {
    const val = event.detail.value;
    this.displayProducts = this.selectedProducts.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (val && this.displayProducts.length == 0) {
      this.productFound = false;
    } else {
      this.productFound = true;
    }
  }
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  async productDetailComponent(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsPage,
      componentProps: { 'product': product },
    });

    await modal.present();
    const data = await modal.onDidDismiss();
  }
}
