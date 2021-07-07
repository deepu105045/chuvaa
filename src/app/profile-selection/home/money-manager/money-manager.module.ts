import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneyManagerPageRoutingModule } from './money-manager-routing.module';

import { MoneyManagerPage } from './money-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneyManagerPageRoutingModule
  ],
  declarations: [MoneyManagerPage]
})
export class MoneyManagerPageModule {}
