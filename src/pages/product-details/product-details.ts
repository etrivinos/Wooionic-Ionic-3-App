import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

	product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.product = this.navParams.get('product');

  	console.log('this.product');
  	console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
