import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { IUser } from './models/models';

@Component({
  selector: 'pdp-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @Input() logOut: LoginComponent;

  public user: IUser;
  public avatar: string = 'assets/profile-icon.svg';

  constructor(private loginService: LoginService,
    private storage: LocalStorageService, 
    private userService: UserService,
    private router: Router) {}
 
  ngOnInit(): void {
    
    let onUserLogged = this.loginService.getOnLogged();
    onUserLogged.subscribe((user: IUser) => {
      this.user = user;
      this.avatar = (user && user.avatar.url)? this.user.avatar.url : this.avatar;
    });

    const token = this.storage.read('token') as string;

    if (!token) return;
    
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.user = decoded.user;

    if(decoded.user)
      this.userService.get(decoded.user._id, token).subscribe((user: IUser) => {
        if (user.avatar)
          this.avatar = user.avatar.url
      });
  }

  public logout(): void {

    if(confirm('¿Quiere cerrar su sesión?'))
    {
      this.storage.delete('token');
      this.loginService.emitOnLogged(null);
      this.router.navigateByUrl('login');
    }
  }
}
