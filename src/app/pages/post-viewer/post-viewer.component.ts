import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PurchasesService } from 'src/app/services/purchases.service';
import { CartService } from 'src/app/services/cart.service';
import { IPost, IPurchase } from 'src/app/models/models';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'pdp-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss']
})
export class PostViewerComponent implements OnInit {

  public userId: string;
  public postId: string;
  public post: IPost;
  public isBuyed: boolean = false;

  constructor(private postService: PostService,
    private route: ActivatedRoute, 
    private storage: LocalStorageService,
    private router: Router,
    private purchaseService: PurchasesService,
    private cartService: CartService,
    private toastyService: ToastyService ) { }

  ngOnInit() {

    this.userId = this.route.snapshot.params.userId;
    this.postId = this.route.snapshot.params.id;

    const token = this.storage.read('token') as string;

    this.postService.get(this.userId, this.postId, token).subscribe((res: IPost) => {
      this.post = res;
    });

    this.checkIsBuyed();
  }

  public viewProfile(): void {
    this.router.navigateByUrl(`profile/${this.userId}`)
  }

  public async buy(): Promise<void> {
    
    const token = this.storage.read('token') as string;

    let purchase: IPurchase;
    await this.purchaseService.create(this.userId, { postId: this.postId }, token).toPromise()
      .then((p: IPurchase) => purchase = { ...p } );
      
    this.isBuyed = true;
    this.download();
  }

  public addToCart(): void {

    if (this.cartService.alreadyInCart(this.postId)) {
      this.toastyService.info({
        title: 'Post en carrito',
        msg: 'El post ya está añadido',
        timeout: 4000,
        theme: 'bootstrap',
        showClose: true
      });

      return;
    }

    const token = this.storage.read('token') as string;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    this.cartService.add(this.post);
    this.router.navigateByUrl(`users/${decoded.user._id}/cart`);
  }

  public isOwner(): boolean {
    const token = this.storage.read('token') as string;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    return decoded.user._id === this.userId;
  }

  public checkIsBuyed(): void {
    const token = this.storage.read('token') as string;

    this.purchaseService.list(this.userId, token).subscribe((ps: IPurchase[]) => {

      if(ps.length == 0) return;

      let isBuyed = ps.find(p => { 
        let post = p.post as IPost; 
        return post._id == this.postId; 
      })

      if(isBuyed)
        this.isBuyed = true;
    });
  }

  public download(): void {
    window.open(this.post.picture.url)
  }
  
  public onClick(event) {

    if(event.button == 2) 
      return false; 
  }
}