import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryListPageRoutingModule } from './grocery-list-routing.module';

import { GroceryListPage } from './grocery-list.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    GroceryListPageRoutingModule
  ],
  declarations: [GroceryListPage]
})
export class GroceryListPageModule {}
