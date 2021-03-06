import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { ProductsByCategoryPage }  from '../pages/products-by-category/products-by-category';
import { ProductDetailsPage }  from '../pages/product-details/product-details';
import { CartPage }  from '../pages/cart/cart';
import { SignupPage }  from '../pages/signup/signup';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    HomePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    HomePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
