import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSelectionPage } from './profile-selection.page';

const routes: Routes = [
  {
    path: 'create-home',
    loadChildren: () => import('../shared/family/create-home/create-home.module').then( m => m.CreateHomePageModule)
  },
  {
    path: 'daily-expense/:id',
    loadChildren: () => import('../shared/cash-flow/cash-flow.module').then( m => m.CashFlowPageModule)
  },
  {
    path: '',
    component: ProfileSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSelectionPageRoutingModule {}
