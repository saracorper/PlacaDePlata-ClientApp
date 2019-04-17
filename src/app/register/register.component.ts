import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor() { }

  ngOnInit() {
  }

  public register():void {
    console.log('register', this.email, this.password, this.confirmPassword);
  }

}
