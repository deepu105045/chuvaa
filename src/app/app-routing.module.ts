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
    path: 'profile-selection',
    loadChildren: () => import('./profile-selection/profile-selection.module').then( m => m.ProfileSelectionPageModule)
  },
  {
    path: 'kitchen',
    loadChildren: () => import('./shared/kitchen/kitchen.module').then( m => m.KitchenPageModule)
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./shared/coming-soon/coming-soon.module').then( m => m.ComingSoonPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'create-home',
    loadChildren: () => import('./shared/family/create-home/create-home.module').then( m => m.CreateHomePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
