import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostViewerComponent } from './pages/post-viewer/post-viewer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { AuthGuard } from './guards/auth-guard.service';

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
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:userId/posts/new',
    component: PostFormComponent
  },
  {
    path: 'users/:userId/posts/:id',
    component: PostViewerComponent
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent
  },
  {
    path:'profile/:id/edit',
    component: ProfileFormComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
