import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToBagPageRoutingModule } from './add-to-bag-routing.module';

import { AddToBagPage } from './add-to-bag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToBagPageRoutingModule
  ],
  declarations: [AddToBagPage]
})
export class AddToBagPageModule {}
