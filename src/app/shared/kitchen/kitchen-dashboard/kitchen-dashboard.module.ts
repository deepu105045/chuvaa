import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KitchenDashboardPageRoutingModule } from './kitchen-dashboard-routing.module';

import { KitchenDashboardPage } from './kitchen-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KitchenDashboardPageRoutingModule
  ],
  declarations: [KitchenDashboardPage]
})
export class KitchenDashboardPageModule {}
