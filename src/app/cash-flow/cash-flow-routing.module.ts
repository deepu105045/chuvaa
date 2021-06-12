import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashFlowPage } from './cash-flow.page';

const routes: Routes = [
  {
    path: '',
    component: CashFlowPage
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowPageRoutingModule {}
