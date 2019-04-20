import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http: HttpClient) { }

  public list(token:string, id?:string): Observable <any> {

    const header = new HttpHeaders({
      'JWTtoken': token
    });

    const user = id? id: 'all';

    return this.http.get(`http://localhost:3000/api/users/${user}/posts`, {headers:header});

  }

  
}