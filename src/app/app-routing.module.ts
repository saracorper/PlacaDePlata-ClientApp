import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path:'gallery',
    component: GalleryComponent
  },
  {
    path: 'users/:userId/posts/new',
    component: PostFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
