import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'pdp-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public user: IUser;

  constructor(private loginService: LoginService) {}
 
  ngOnInit(): void {
    
    let onUserLogged = this.loginService.getOnLogged();

    onUserLogged.subscribe(user => this.user = user);
  }
}

interface IUser {
  _id: string,
  fullName: string
}