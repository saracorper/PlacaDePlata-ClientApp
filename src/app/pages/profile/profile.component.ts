import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pdp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: {
    _id: string,
    fullName: string,
    email: string,
    avatar: {
      url: string
    },
    posts: [{
      _id: string,
      title: string,
      description: string,
      picture: {
        url: string
      }
    }]
  };
  

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

  public edit(): void{

    let id = this.route.snapshot.params.userId;
    
    this.router.navigateByUrl(`profile/${id}/edit`);
  }

  public createPost() {
    this.router.navigateByUrl(`users/${this.user._id}/posts/new`);
  }

  public deleteAccount(): void {
    let token = this.storage.read("token") as string;

    if (confirm('¿Estás seguro? Si aceptas borrarás tu cuenta'))
      this.userService.delete(this.user._id, token).subscribe(() => this.router.navigateByUrl('login'))
  }

  public isOwner(): boolean {
    let helper = new JwtHelperService();

    let token = this.storage.read("token") as string;
    let decoded = helper.decodeToken(token);

    if(!decoded || !decoded.user) return false;
    
    return this.user._id === decoded.user._id;
  }

  public viewDetail(id: string, author: string): void {
    this.router.navigateByUrl(`/users/${author}/posts/${id}`);
  }
}




