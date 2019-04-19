import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'pdp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  constructor(private postService: PostService, private localStorage: LocalStorageService) { }

  ngOnInit() {

    let token = this.localStorage.read('token');
    console.log('token leido :', token);
  }
}
