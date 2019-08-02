import { UpdateWelcomePageProvider } from './../providers/update-welcome-page/update-welcome-page';
import { ExpenseListPage } from './../pages/expense-list/expense-list';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { UserInfoPage } from '../pages/user-info/user-info';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title:string, component:any}>;
  userName : any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private updateWelcomePage: UpdateWelcomePageProvider, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkPreviousAuthorization();
      this.pages = [{title: 'Home', component:WelcomePage}, {title: 'Edit User', component: UserInfoPage}, {title:'Expenses', component: ExpenseListPage}];
    });
    events.subscribe('updateUser', (user)=> {
      this.userName = user;
    });
  }
  checkPreviousAuthorization(): void {
    this.storage.get('password').then(function(pass){
      if(pass == "" || pass === null || pass === undefined) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = WelcomePage;
      }
    }.bind(this));
  }
  openPage(page){
    this.nav.setRoot(page.component);
  }
  logout(){
    this.updateWelcomePage.currentUser = '';
    this.updateWelcomePage.userName = '';
    this.storage.set('password', '');
    this.updateWelcomePage.salary = '';
    this.updateWelcomePage.savings = '';
    this.nav.setRoot(LoginPage);
}

}
