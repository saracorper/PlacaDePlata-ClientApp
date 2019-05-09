import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/models';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { PurchasesService } from 'src/app/services/purchases.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'pdp-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public posts: IPost[] = [];
  public totalPrice = 0;
  public buyed = false;

  private _onAddPost: BehaviorSubject<IPost[]>;

  constructor(private cartService: CartService, 
    private purchaseService: PurchasesService, 
    private storage: LocalStorageService,
    private toastyService: ToastyService) {

    this._onAddPost = cartService.onAddPost;
  }

  ngOnInit() {
    this.calculateTotal();

    this._onAddPost.subscribe(posts => {
      
        this.posts = posts;
        this.calculateTotal();
    })
  }

  public delete(id: string): void {
    
    this.cartService.delete(id);
    this.calculateTotal();
  }

  public buy(): void {

    const token = this.storage.read('token') as string;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    let postsToBuy = this.posts.map(p =>  { return { postId: p._id} })

    this.purchaseService.create(decoded.user._id, postsToBuy, token).subscribe(() => {
      this.toastyService.success({
        title: 'Compra realizada',
        msg: 'Ya puede descargar las imágenes desde el visor de cada post',
        timeout: 4000,
        theme: 'bootstrap',
        showClose: true
      });

      this.buyed = true;
    })
  }

  public calculateTotal(): void {

    if(this.posts.length === 0) return;

    let prices = this.posts.map(p => p.price)

    let totalPrice: number = prices.reduce((previous, current) => {
      previous += current;
      return previous;
    });

    this.totalPrice = totalPrice;
  }
}



