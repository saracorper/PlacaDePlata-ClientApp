import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'pdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public valEmail: string = '';
  public valPass: string = '';

  constructor(private loginService: LoginService,
     private storage: LocalStorageService,
     private router: Router,
     private toastyService: ToastyService,
     private toastyConfig: ToastyConfig
    ) { 
      this.toastyConfig.theme = "bootstrap";
    }


  ngOnInit() {
  }

  /**
   * login
   */
  public login():void {

    const body = {
      password: this.valPass,
      email: this.valEmail
    }

    this.loginService.log(body).subscribe(res => {
      this.storage.save('token', res.token);
      this.router.navigateByUrl('gallery');
    },
    error => {
      let config = {
        title: 'Error.',
        msg: 'Credenciales incorrectas.',
        showClose: true,
        timeout: 3000,
        theme: 'bootstrap'
      };
      if(error.status == 404 || error.status == 400)
        this.toastyService.error(config);
      else{
        config.msg = "Se ha producido un error inesperado";
        this.toastyService.error(config);
      }
      
    });
  }
}
