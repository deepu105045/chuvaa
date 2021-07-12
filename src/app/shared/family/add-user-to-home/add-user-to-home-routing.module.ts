import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserToHomePage } from './add-user-to-home.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserToHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserToHomePageRoutingModule {}
