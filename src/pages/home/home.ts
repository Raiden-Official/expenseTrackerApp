import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }
  loginClicked(){
    this.navCtrl.push(WelcomePage)
  }
}
