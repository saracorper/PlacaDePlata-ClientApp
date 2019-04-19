import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pdp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {





    
  }

  

}
