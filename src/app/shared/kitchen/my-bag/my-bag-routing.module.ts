import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBagPage } from './my-bag.page';

const routes: Routes = [
  {
    path: '',
    component: MyBagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBagPageRoutingModule {}
