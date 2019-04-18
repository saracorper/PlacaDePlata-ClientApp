import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
    

  }

  public update(id: string, user: { fullName?: string, confirmAt?: Date }, token: string): Observable <any> {

    let header = new HttpHeaders({
      'JWTtoken': token
    });

    return this.http.put(`http://localhost:3000/api/users/${id}`, user, { headers: header });
  }

}
