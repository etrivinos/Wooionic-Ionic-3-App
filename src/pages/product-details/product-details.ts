import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

	product: any;
  WooCommerce: any; 
  reviews: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage
  ) 
  {
  	this.product = this.navParams.get('product');

    this.WooCommerce = WC({
      url:            "http://edwintrivinos.com/cusstom_apps/woo_commerce_ionic_3/",
      consumerKey:    "ck_8f07070deceadfc7cbaffdb425b5621ef91e9956",
      consumerSecret: "cs_732111e679d2bd8563bec6c03d670a56680a26d2"
    });

  	this.WooCommerce.getAsync("products/" + this.product.id + "/reviews")
      .then((data) => {
        this.reviews = JSON.parse(data.body).product_reviews;
        console.log('this.reviews');
        console.log(this.reviews);
      }, (error) => {
        console.log(error);
      });
  }

  addToCart(product) {
    this.storage.get('cart').then((cart) => {
      let cart = cart || [];
      let itemExist = false;

      for(let i = 0; i < cart.length; i++) {
        if(product.id === cart[i].product.id) {
          cart[i].qty++;
          cart[i].amount += +cart[i].product.price;

          itemExist = true;
        }
      }

      if(!itemExist) {
        cart.push({
          product:  product,
          qty:      1,
          amount:   +product.price
        });
      }

      this.storage.set('cart', cart);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
