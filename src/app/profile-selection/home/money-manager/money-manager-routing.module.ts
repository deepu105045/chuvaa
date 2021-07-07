import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyManagerPage } from './money-manager.page';

const routes: Routes = [
  {
    path: '',
    component: MoneyManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyManagerPageRoutingModule {}
