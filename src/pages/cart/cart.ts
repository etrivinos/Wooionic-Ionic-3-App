import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	cart: any[] = [];
	total: any;
  cartIsEmpty: boolean = false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public storage: Storage,
  	public viewCtrl: ViewController
	) {
  	this.getCart();
  }

  getCart() {
    this.storage.ready().then(() => {
      this.storage.get('cart').then((data) => {
        this.cart = data || [];
        this.total = 0;

        if(this.cart.length) {
          this.total = this.cart.reduce((previous, current, index) => {
            return previous + current.amount;
          }, 0);
        }
        else {
          this.cartIsEmpty = true;
        }
      });
    });
  }

  removeFromCart(item, i) {
    this.cart.splice(i, 1);

    this.storage.set('cart', this.cart).then(() => {
      this.getCart();
    });
  }

  checkout() {

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}