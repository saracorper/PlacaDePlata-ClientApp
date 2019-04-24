import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'pdp-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss']
})
export class PostViewerComponent implements OnInit {

  public userId: string;
  public postId: string;

  constructor(private postService: PostService, private route: ActivatedRoute, private storage: LocalStorageService) { }

  ngOnInit() {

    this.userId = this.route.snapshot.params.userId;
    this.postId = this.route.snapshot.params.id;

    console.log(`userId: ${this.userId}, postId: ${this.postId}`)

    const token = this.storage.read('token') as string;

    this.postService.get(this.userId, this.postId, token).subscribe(res => console.log(res));
  }

}
