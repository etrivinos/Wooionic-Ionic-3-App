import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  billing_shipping_same: boolean = false;
  WooCommerce: any;

	newUser: any = {
		billing_address: 	{},
		shipping_address: {}
	};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.WooCommerce = WC({
      url:            "http://edwintrivinos.com/cusstom_apps/woo_commerce_ionic_3/",
      consumerKey:    "ck_8f07070deceadfc7cbaffdb425b5621ef91e9956",
      consumerSecret: "cs_732111e679d2bd8563bec6c03d670a56680a26d2"
    });
  }

  setBillingToShipping(event) {
  	this.billing_shipping_same = event._value;
  }

  checkEmail() {
    let validEmail = false;
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(regex.test(this.newUser.email)) {
      this.WooCommerce.getAsync("customers/email/" + this.newUser.email)
        .then((data) => {
          let errors = JSON.parse(data.body).errors;
          console.log('errors');
          console.log(errors);

          if(errors[0].code === 'woocommerce_api_invalid_customer_email') { 
            validEmail = true; 
            this.toastCtrl.create({ message: 'Congratulations. Email is good to go', duration: 3000 }).present();
          }
          else {
            validEmail = false;
            this.toastCtrl.create({ message: errors[0].message + '. Please check.', showCloseButton: true }).present();
          }
        }, (error) => {
          console.log(error);
        });
    }
    else {
      validEmail = false;
      this.toastCtrl.create({ message: 'Email has an invalid format. Please check.', showCloseButton: true }).present();
    }
  }
}
