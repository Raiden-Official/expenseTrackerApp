import { UpdateWelcomePageProvider } from './../providers/update-welcome-page/update-welcome-page';
import { AddMoneyPage } from './../pages/add-money/add-money';
import { UserInfoPage } from './../pages/user-info/user-info';
import { ExpenseFormPage } from './../pages/expense-form/expense-form';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { WelcomePage } from './../pages/welcome/welcome';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExpenseListPage } from '../pages/expense-list/expense-list';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ExpenseFormPage,
    ExpenseListPage,
    UserInfoPage,
    AddMoneyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ExpenseFormPage,
    ExpenseListPage,
    UserInfoPage,
    AddMoneyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UpdateWelcomePageProvider,
  ]
})
export class AppModule {}
