import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserToHomePageRoutingModule } from './add-user-to-home-routing.module';

import { AddUserToHomePage } from './add-user-to-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUserToHomePageRoutingModule
  ],
  declarations: [AddUserToHomePage]
})
export class AddUserToHomePageModule {}
