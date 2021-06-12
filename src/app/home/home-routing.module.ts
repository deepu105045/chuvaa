import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashFlowPage } from '../cash-flow/cash-flow.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'cash-flow',
    component: CashFlowPage,
  },
  {
    path: '',
    component: HomePage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
