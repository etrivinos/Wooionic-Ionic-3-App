import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';
import { ProductDetailsPage }  from '../product-details/product-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any;
  moreProducts: any;

  page: number;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) 
  {
    this.page = 2;

  	this.WooCommerce = WC({
  		url: 						"http://edwintrivinos.com/cusstom_apps/woo_commerce_ionic_3/",
  		consumerKey: 		"ck_8f07070deceadfc7cbaffdb425b5621ef91e9956",
  		consumerSecret: "cs_732111e679d2bd8563bec6c03d670a56680a26d2"
  	});

    this.loadMoreProducts(null);

	  this.WooCommerce.getAsync("products")
	  	.then((data) => {
	  		this.products = JSON.parse(data.body).products;
	  	}, (error) => {
	  		console.log(error);
	  	});
  }

  ionViewDidLoad() {
    setInterval(() => {
      if(this.productSlides.getActiveIndex() === this.productSlides.length() - 1) {
        this.productSlides.slideTo(0);
      }
      else {
        this.productSlides.slideNext();
      }
    }, 3000);
  }

  loadMoreProducts(event) {
    if(!event) { 
      this.page = 2;
      this.moreProducts = [];
    }
    else { this.page++; }

    this.WooCommerce.getAsync("products?page=" + this.page)
      .then((data) => {
        let moreProducts = JSON.parse(data.body).products;
        this.moreProducts = this.moreProducts.concat(moreProducts);

        if(event) { 
          event.complete(); 
          if(moreProducts.length < 10) { 
            event.enable(false); 

            this.toastCtrl.create({
              message: 'No more products!',
              duration: 1000
            }).present();
          }
        }
      }, (error) => {
        console.log(error);
      });
  }

  openProductPage(product) {
    this.navCtrl.push(ProductDetailsPage, { product: product });
  }
}
