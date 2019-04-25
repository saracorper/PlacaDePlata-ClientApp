import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pdp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private storage: LocalStorageService, 
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let token = this.storage.read("token") as string;
    console.log(token);

    const helper = new JwtHelperService();
    let decoded = helper.decodeToken(token);

    this.profileService.get(decoded.user._id, token).subscribe(res => console.log(res));
    
  }
  
  

}
