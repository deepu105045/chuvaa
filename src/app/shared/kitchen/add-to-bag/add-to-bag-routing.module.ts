import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToBagPage } from './add-to-bag.page';

const routes: Routes = [
  {
    path: '',
    component: AddToBagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToBagPageRoutingModule {}
