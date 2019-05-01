import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { OwnerGuard } from 'src/app/guards/owner-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: ":userId",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ":userId/edit",
    component: ProfileFormComponent,
    canActivate: [AuthGuard, OwnerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
