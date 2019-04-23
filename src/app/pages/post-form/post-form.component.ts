import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router, ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: "pdp-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})

export class PostFormComponent implements OnInit {

  public valTitle: string = "";
  public valDescription: string = "";
  public valPicture: File;
  private userId: string;

  constructor(
    private storage: LocalStorageService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
  }
  
  public createPost(): void {
    
    const body = {
      title: this.valTitle,
      description: this.valDescription,
    };
    
    const file = {
      name: 'picture',
      file: this.valPicture
    }
    const token = this.storage.read('token') as string;

    // this.postService.create(this.userId, body, file ,token).subscribe(res => console.log(res));
    
    
  };
    
}
