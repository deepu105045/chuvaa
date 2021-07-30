import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBagPageRoutingModule } from './my-bag-routing.module';

import { MyBagPage } from './my-bag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBagPageRoutingModule
  ],
  declarations: [MyBagPage]
})
export class MyBagPageModule {}
