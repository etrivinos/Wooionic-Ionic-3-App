import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	newUser: any = {
		billing_address: 	{},
		shipping_address: {}
	};

	billing_shipping_same: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  setBillingToShipping(event) {
  	this.billing_shipping_same = event._value;
  }
}
