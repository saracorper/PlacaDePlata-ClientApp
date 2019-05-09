import { Component, OnInit } from '@angular/core';
// import { IPicture } from ('../');

@Component({
  selector: 'pdp-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public posts: IPost[] = [
  {
    title: "post prueba",
    _id: "5ccb4c904223ee143c3875cc",
    picture: {
      url:
        "https://res.cloudinary.com/footon/raw/upload/v1556827279/5ccb4c8e4223ee143c3875cb.jpg",
      _id: "5ccb4c8e4223ee143c3875cb",
    },
    description: "postprueba",
    price: 10,
  },
  {
    title: "dsafafadsf",
    _id: "5ccccff75cba8558779fc693",
    picture: {
      url:
        "https://res.cloudinary.com/footon/raw/upload/v1556926454/5ccccff55cba8558779fc692.jpg",
      _id: "5ccccff55cba8558779fc692",
    },
    description: "asdfadf",
    price: 7,
  },
  {
    title: "arbol",
    _id: "5cccd11c514ca1222cc2894d",
    picture: {
      url:
        "https://res.cloudinary.com/footon/raw/upload/v1556926749/5cccd11b514ca1222cc2894c.jpg",
      _id: "5cccd11b514ca1222cc2894c",
    },
    description: "arbolito",
    price: 15,
  },
  {
    title: "coello",
    _id: "5cccd4ac3ced8c107a9fecef",
    picture: {
      url:
        "https://res.cloudinary.com/footon/raw/upload/v1556927659/5cccd4aa3ced8c107a9fecee.jpg",
      _id: "5cccd4aa3ced8c107a9fecee",
    },
    description: "miau",
    price: 20,
  },
  {
    title: "Prueba",
    _id: "5cd072127ece2d0c72d70eac",
    picture: {
      url:
        "https://res.cloudinary.com/footon/raw/upload/v1557164562/5cd072117ece2d0c72d70eab.jpg",
      _id: "5cd072117ece2d0c72d70eab",
    },
    description: "lolilolada",
    price: 15
  }
];

  public totalPrice = 0;

  constructor() { }

  ngOnInit() {
    this.totalPrice = this.calculateTotal();
  }

  public delete(id: string): void {
    this.posts = this.posts.filter(p => p._id !== id);
    this.totalPrice = this.calculateTotal();
  }

  public buy(): void {

  }

  public calculateTotal(): number {

    let prices = this.posts.map(p => p.price)

    const totalPrice: number = prices.reduce((previous, current) => {
      previous += current;
      return previous;
    });

    return totalPrice;
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
  price: number
}

