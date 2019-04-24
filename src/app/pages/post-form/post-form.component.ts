import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router, ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PostService } from 'src/app/services/post.service';
import { PictureService } from 'src/app/services/picture.service';



@Component({
  selector: "pdp-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})

export class PostFormComponent implements OnInit {
  
  public valPicture: File;

  public valTitle: string = "";
  public valDescription: string = "";
  private userId: string;

  constructor(
    private storage: LocalStorageService,
    private pictureService: PictureService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
  }
  
  public async createPost(): Promise<void> {
    
    const token = this.storage.read('token') as string;
    
    const myfile = {
      name: "picture",
      file: this.valPicture
    }
    
    let newUrl = ""; 
    await this.pictureService.create(myfile , token).toPromise().then((res: { url: string}) => {
      newUrl = res.url;
      console.log('res :', res);
    });
    
    const body = {
      title: this.valTitle,
      description: this.valDescription,
      url: newUrl
    };

    console.log('body :', body);

    // this.postService.create(this.userId, body, file ,token).subscribe(res => console.log(res));
    
    
  }
    
}
