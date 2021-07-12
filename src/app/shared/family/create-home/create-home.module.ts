import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHomePageRoutingModule } from './create-home-routing.module';

import { CreateHomePage } from './create-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateHomePageRoutingModule
  ],
  declarations: [CreateHomePage]
})
export class CreateHomePageModule {}
