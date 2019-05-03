import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFormComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
