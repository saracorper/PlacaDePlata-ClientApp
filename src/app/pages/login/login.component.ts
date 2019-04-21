import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public valEmail: string = '';
  public valPass: string = '';

  constructor(private loginService: LoginService, private storage: LocalStorageService, private router: Router) { }


  ngOnInit() {
  }

  /**
   * login
   */
  public login():void {
    console.log('user', this.valEmail);
    console.log('password', this.valPass);
    const body = {
      password: this.valPass,
      email: this.valEmail
    }
    this.loginService.log(body).subscribe(res => {
      this.storage.save('token', res.token)
      this.router.navigateByUrl('gallery');
    })
  }

}
