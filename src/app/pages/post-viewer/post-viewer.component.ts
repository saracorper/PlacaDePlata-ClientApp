import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'pdp-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss']
})
export class PostViewerComponent implements OnInit {

  public userId: string;
  public postId: string;
  public post: IPost;

  constructor(private postService: PostService,
    private route: ActivatedRoute, 
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.userId = this.route.snapshot.params.userId;
    this.postId = this.route.snapshot.params.id;

    const token = this.storage.read('token') as string;

    this.postService.get(this.userId, this.postId, token).subscribe((res: IPost) => {
      this.post = res;
    });
  }

  public viewProfile(): void {
    this.router.navigateByUrl(`profile/${this.userId}`)
  }

  public buy(): void {
    console.log("userId:", this.userId, "postId:", this.postId);
  }
}

interface IPicture {
  _id: string,
  url: string
}

interface IPost {
  _id: string,
  title: string, 
  description: string, 
  picture: IPicture,
  author: IUser,
  price: Number

}

interface IUser {
  _id: string,
  fullName: string,
  email: string
}
