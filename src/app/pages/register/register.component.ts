import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public emailVal: string = '';
  public passwordVal: string = '';
  public confPasswordVal: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public register():void {
    
    const body = {
        password: this.confPasswordVal,
        email: this.emailVal
    };

    this.http.post("http://localhost:3000/api/users", body).subscribe();
  }
}
