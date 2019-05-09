import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _onAddPost: BehaviorSubject<IPost[]>;
  private postsInCart: IPost[] = []

  constructor() { 
    this._onAddPost = new BehaviorSubject([])
  }

  
  public get onAddPost() : BehaviorSubject<IPost[]> {
    return this._onAddPost;
  }

  public add(post: IPost): void {
    this.postsInCart.push(post)
    this._onAddPost.next(this.postsInCart);
  }

  public delete(id: string): void {
    this.postsInCart = this.postsInCart.filter(p => p._id !== id);
    this._onAddPost.next(this.postsInCart);
  }

  public alreadyInCart(id: string): boolean {

    let postInCart = this.postsInCart.find(p => p._id == id); 
    return postInCart !== undefined;
  }
}
