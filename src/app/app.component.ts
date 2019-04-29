import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'pdp-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @Input() logOut: LoginComponent;

  public user: IUser;

  constructor(private loginService: LoginService,
    private storage: LocalStorageService, 
    private router: Router) {}
 
  ngOnInit(): void {
    
    let onUserLogged = this.loginService.getOnLogged();
    onUserLogged.subscribe(user => this.user = user as IUser);

    const token = this.storage.read('token') as string;

    if (!token) return;
    
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.user = decoded.user;
  }

  public logout(): void {

    this.storage.delete('token');
    this.loginService.emitOnLogged(null);
    this.router.navigateByUrl('login');
  }
}

interface IUser {
  _id: string,
  fullName: string,
  email: string
}