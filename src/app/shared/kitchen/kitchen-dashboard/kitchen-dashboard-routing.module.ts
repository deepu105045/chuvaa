import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitchenDashboardPage } from './kitchen-dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: KitchenDashboardPage,
    children:[
      {
        path:'grocery-list',
        children:[
          {
            path:'',
            loadChildren: () => import('../grocery-list/grocery-list.module').then( m => m.GroceryListPageModule)
          },
          {
            path:'',
            redirectTo:'tabs/grocery-list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path:'mybag',
        children:[
          {
            path:'',
            loadChildren: () => import('../my-bag/my-bag.module').then(m => m.MyBagPageModule)
          }
        ]
      }
    ]
  },
  {
    path:'',
    redirectTo:'tabs/mybag',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitchenDashboardPageRoutingModule {}
