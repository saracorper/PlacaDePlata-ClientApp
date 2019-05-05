import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PurchasesService } from 'src/app/services/purchases.service';

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
    private router: Router,
    private purchaseService: PurchasesService
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

  public async buy(): Promise<void> {
    console.log("userId:", this.userId, "postId:", this.postId);
    const token = this.storage.read('token') as string;

    let purchase: IPurchase;
    await this.purchaseService.create(this.userId, { postId: this.postId }, token).toPromise()
      .then((p: IPurchase) => purchase = { ...p } );

    this.postService.get(this.userId, purchase.post, token)
      .subscribe((p : IPost) => window.open(p.picture.url));
  }

  public isOwner(): boolean {
    const token = this.storage.read('token') as string;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    return decoded.user._id === this.userId;
  }

  public onClick(event) {

    if(event.button == 2) 
      return false; 
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

interface IPurchase { 
  post: string, 
  buyer: string 
}
