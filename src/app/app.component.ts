import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pdp-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public user: IUser;

  constructor(private loginService: LoginService, private storage: LocalStorageService) {}
 
  ngOnInit(): void {
    
    let onUserLogged = this.loginService.getOnLogged();
    onUserLogged.subscribe(user => this.user = user as IUser);

    const token = this.storage.read('token') as string;

    if (!token) return;
    
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.user = decoded.user;
  }
}

interface IUser {
  _id: string,
  fullName: string,
  email: string
}