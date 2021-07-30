import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppDashboardPage } from './app-dashboard.page';

const routes: Routes = [
  {
    path: 'create-home',
    loadChildren: () => import('../shared/family/create-home/create-home.module')
                      .then( m => m.CreateHomePageModule)
  },
  {
    path: 'daily-expense/:id',
    loadChildren: () => import('../shared/cash-flow/cash-flow.module')
                      .then( m => m.CashFlowPageModule)
  },
  {
    path: 'add-members/:id',
    loadChildren: () => import('.././shared/family/add-members/add-members.module')
                      .then( m => m.AddMembersPageModule)
  },
  {
    path: 'kitchen-dashboard/:id',
    loadChildren: () => import('../shared/kitchen/kitchen-dashboard/kitchen-dashboard.module')
                      .then( m => m.KitchenDashboardPageModule)
  },
  {
    path: '',
    component: AppDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDashboardPageRoutingModule {}
