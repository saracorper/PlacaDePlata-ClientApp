import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ToastyModule } from 'ng2-toasty';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostViewerComponent } from './pages/post-viewer/post-viewer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { PostItemComponent } from './presenters/post-item/post-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    GalleryComponent,
    PostFormComponent,
    PostViewerComponent,
    ProfileComponent,
    ProfileFormComponent,
    NotAuthorizedComponent,
    PostItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    FormsModule,
    ToastyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
