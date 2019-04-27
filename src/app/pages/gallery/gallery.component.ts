import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pdp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  public posts = [];
    

  constructor(private postService: PostService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {

    let token = this.localStorage.read('token') as string;

    this.postService.list(token).subscribe(posts =>{
      this.posts = posts;
    });
  }

  public viewDetail(postId: string, userId: string): void {

    this.router.navigateByUrl(`users/${userId}/posts/${postId}`);
  }
}
