import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string = '';
  public password: string = '';

  constructor() { }

  ngOnInit() {
  }

  /**
   * login
   */
  public login():void {
    console.log('user', this.user);
    console.log('password', this.password);
    
  }

}
