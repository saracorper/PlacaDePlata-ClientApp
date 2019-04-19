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

  public posts = [];
    

  constructor(private postService: PostService, private localStorage: LocalStorageService) { }

  ngOnInit() {

    let token = this.localStorage.read('token') as string;
    console.log('token leido :', token);

    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    this.postService.list(token).subscribe(posts =>{
      console.log(posts);
      this.posts = posts;
    });
  }
}
