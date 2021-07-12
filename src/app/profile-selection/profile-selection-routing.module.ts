import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSelectionPage } from './profile-selection.page';

const routes: Routes = [
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
