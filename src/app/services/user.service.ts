import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
    

  }

  public update(id: string, user: { fullName?: string, confirmAt?: Date, email?: string }, token: string): Observable <any> {

    let header = new HttpHeaders({
      'JWTtoken': token
    });

    return this.http.put(`http://localhost:3000/api/users/${id}`, user, { headers: header });
  }

  public create(user: {email: string, password: string}): Observable<any> {

    return this.http.post("http://localhost:3000/api/users", user);
  }

  public get(id: string, token: string): Observable <any> {

    const header = new HttpHeaders({
      JWTtoken: token
    });

    return this.http.get(`http://localhost:3000/api/users/${id}`, { headers: header });
  }
}
