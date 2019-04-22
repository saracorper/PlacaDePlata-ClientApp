import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
@Component({
  selector: 'pdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public emailVal: string = '';
  public passwordVal: string = '';
  public confPasswordVal: string = '';

  constructor(private http: HttpClient, 
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  }

  public register():void {
    
    const body = {
        password: this.confPasswordVal,
        email: this.emailVal
    };

    this.http.post("http://localhost:3000/api/users", body).subscribe(res => 
    error =>{
      let config = {
        title: 'Error.',
        msg: 'Email ya registrado.',
        showClose: true,
        timeout: 3000,
        theme: 'bootstrap'
      };
      if (error.status == 404 || error.status == 400)
        this.toastyService.error(config);
      else {
        config.msg = "Se ha producido un error inesperado";
        this.toastyService.error(config);
      }
    },
    );
  }
}
