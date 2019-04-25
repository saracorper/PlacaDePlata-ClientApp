import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public get(id: string, token: string): Observable <any> {

    const header = new HttpHeaders({
      JWTtoken: token
    });

    return this.http.get(`http://localhost:3000/api/users/${id}`, { headers: header });

  }
}
