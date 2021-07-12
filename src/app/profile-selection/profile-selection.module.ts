import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSelectionPageRoutingModule } from './profile-selection-routing.module';

import { ProfileSelectionPage } from './profile-selection.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ProfileSelectionPageRoutingModule
  ],
  declarations: [ProfileSelectionPage]
})
export class ProfileSelectionPageModule {}
