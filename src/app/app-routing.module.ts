import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   {
    path: 'registration',
    loadChildren: () => import('./user/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./user/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./shared/coming-soon/coming-soon.module').then( m => m.ComingSoonPageModule)
  },
  {
    path: 'app-dashboard',
    loadChildren: () => import('./app-dashboard/app-dashboard.module').then( m => m.AppDashboardPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'add-item',
    loadChildren: () => import('./shared/kitchen/add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'add-to-bag',
    loadChildren: () => import('./shared/kitchen/add-to-bag/add-to-bag.module').then( m => m.AddToBagPageModule)
  },
  {
    path: 'my-bag',
    loadChildren: () => import('./shared/kitchen/my-bag/my-bag.module').then( m => m.MyBagPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
