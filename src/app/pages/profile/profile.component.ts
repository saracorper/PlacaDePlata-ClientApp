import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pdp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: {
    fullName: string,
    email: string,
    avatar: {
      url: string
    }
  }

  constructor(private storage: LocalStorageService, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { }

  ngOnInit() {

    let token = this.storage.read("token") as string;

    let userId = this.route.snapshot.params.userId;

    this.userService.get(userId, token).subscribe(user => this.user = user);
  }

  public edit(){

    let id = this.route.snapshot.params.userId;
    
    this.router.navigateByUrl(`profile/${id}/edit`);
  }
}




