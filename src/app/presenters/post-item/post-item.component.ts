import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdp-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input()
  public post: {
    _id: string,
    author: string,
    title: string,
    description: string,
    picture: {
      url: string
    }
  }

  @Output()
  public onItemClick: EventEmitter<{ id: string, author: string }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  public emitData(id: string, author: string): void {
    this.onItemClick.emit({id, author});
  }
}
