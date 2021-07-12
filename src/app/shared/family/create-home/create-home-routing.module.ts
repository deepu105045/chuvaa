import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateHomePage } from './create-home.page';

const routes: Routes = [
  {
    path: '',
    component: CreateHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHomePageRoutingModule {}
