import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/models';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pdp-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public posts: IPost[] = [];
  public totalPrice = 0;

  private _onAddPost: BehaviorSubject<IPost[]>;

  constructor(private cartService: CartService) {

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



