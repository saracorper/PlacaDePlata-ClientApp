import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'pdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private http: HttpClient, private storage: LocalStorageService) { }


  ngOnInit() {
  }

  /**
   * login
   */
  public login():void {
    console.log('user', this.email);
    console.log('password', this.password);
    const body = {
      password: this.password,
      email: this.email
    }
    this.http
      .post('http://localhost:3000/api/login', body)
      .subscribe((res: { token:string }) => {
        console.log(res);
        this.storage.save('token',res.token)
      });
  }

}
