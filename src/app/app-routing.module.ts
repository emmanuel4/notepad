import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MainComponent } from './components/pages/main/main.component';
import { FormComponent } from './components/pages/form/form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ArchivedComponent } from './components/pages/archived/archived.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'archived',
        component: ArchivedComponent
      },
      {
        path: 'add-note',
        component: FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
