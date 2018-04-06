import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage }	 from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
	homePage : HomePage;

	WooCommerce: any; 
	categories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.homePage = HomePage;

		this.WooCommerce = WC({
  		url: 						"http://edwintrivinos.com/cusstom_apps/woo_commerce_ionic_3/",
  		consumerKey: 		"ck_8f07070deceadfc7cbaffdb425b5621ef91e9956",
  		consumerSecret: "cs_732111e679d2bd8563bec6c03d670a56680a26d2"
  	});

  	this.WooCommerce.getAsync("products/categories")
	  	.then((data) => {
	  		let temp: any[] = JSON.parse(data.body).product_categories;

	  		this.categories = temp.filter((item) => {
					if(item.slug === 'accessories') { item.icon = 'images'; }
					if(item.slug === 'hoodies') 		{ item.icon = 'musical-notes'; }
					if(item.slug === 'tshirts') 		{ item.icon = 'shirt'; }

	  			return !item.parent && item.name !== 'Uncategorized';
	  		});
	  	}, (error) => {
	  		console.log(error);
	  	});
  }

  openCategoryPage(category) {
  	console.log(category);
		this.navCtrl.setRoot(ProductsByCategoryPage, { category: category });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
