import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashFlowPageRoutingModule } from './cash-flow-routing.module';

import { CashFlowPage } from './cash-flow.page';
import { TransactionsPageModule } from './transactions/transactions.module';
import { DashboardPageModule } from './dashboard/dashboard.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CashFlowPageRoutingModule,
    TransactionsPageModule,
    DashboardPageModule,
    BrowserModule
  ],
  declarations: [CashFlowPage]
})
export class CashFlowPageModule {}
