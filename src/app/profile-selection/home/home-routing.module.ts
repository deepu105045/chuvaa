import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashFlowPage } from '../../shared/cash-flow/cash-flow.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'cash-flow',
    loadChildren: () => import('../../shared/cash-flow/cash-flow.module').then( m => m.CashFlowPageModule)
  },
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'money-manager',
    loadChildren: () => import('./money-manager/money-manager.module').then( m => m.MoneyManagerPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
