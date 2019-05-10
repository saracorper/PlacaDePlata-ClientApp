import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from 'src/app/services/post.service';
import { PictureService } from 'src/app/services/picture.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';



@Component({
  selector: "pdp-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})

export class PostFormComponent implements OnInit {
  
  public valPicture: File;

  public valTitle: string = "";
  public valDescription: string = "";
  public valPrice: number;
  private userId: string;
  

  constructor(
    private storage: LocalStorageService,
    private pictureService: PictureService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
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
    
    let newPictureId = ""; 
    await this.pictureService.create(myfile , token).toPromise().then((res: { _id: string}) => {
      newPictureId = res._id;
    },
    error => {
      let config = {
        title: 'Error.',
        msg: 'Imagen no encontrada.',
        showClose: true,
        timeout: 3000,
        theme: 'bootstrap'
      };
      if(error.status == 404)
        this.toastyService.error(config);
      else{
        config.msg = "Se ha producido un error inesperado";
        this.toastyService.error(config);
      }
      
    });
    
    
    const body = {
      title: this.valTitle,
      description: this.valDescription,
      picture: newPictureId,
      price: this.valPrice
    };

    this.postService
      .create(this.userId, body, token)
      .subscribe((post: {_id: string}) =>{
          this.router.navigateByUrl(`users/${this.userId}/posts/${post._id}`);
      },
      error => {
      let config = {
        title: 'Error.',
        msg: 'Credenciales incorrectas.',
        showClose: true,
        timeout: 3000,
        theme: 'bootstrap'
      };
      if( error.status == 400)
        this.toastyService.error(config);
      else{
        config.msg = "Se ha producido un error inesperado";
        this.toastyService.error(config);
      }
    });
  }
}

