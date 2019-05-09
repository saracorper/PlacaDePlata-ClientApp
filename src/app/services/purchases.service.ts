import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  public create(buyerId: string, body: {postId: string}[], token: string): Observable<any> {
    
    const headers = new HttpHeaders({
      JWTtoken: token 
    });

    return this.http.post(`http://localhost:3000/api/users/${buyerId}/purchases`, body, { headers });
  } 

  public list(userId: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      JWTtoken: token 
    });

    return this.http.get<any[]>(`http://localhost:3000/api/users/${userId}/purchases`, {headers});
  }
}
