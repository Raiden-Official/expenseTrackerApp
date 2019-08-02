import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMoneyPage } from './add-money';

@NgModule({
  declarations: [
    AddMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMoneyPage),
  ],
})
export class AddMoneyPageModule {}
