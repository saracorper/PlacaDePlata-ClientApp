import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public register():void {
    console.log('register', this.email, this.password, this.confirmPassword);
    
    const body = {
      password: this.password,
      email: this.email
    };

    this.http.post("http://localhost:3000/api/users", body).subscribe();
  }

}
