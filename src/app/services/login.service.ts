import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public log(body: { email: string, password: string }): Observable <{ token: string }>{
    return this.http.post<{ token: string }>('http://localhost:3000/api/login', body);
  }
}
