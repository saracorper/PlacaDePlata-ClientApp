import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  declarations: [
    PostItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostItemComponent
  ]
})
export class SharedModule { }
