import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PictureService {
  constructor(private http: HttpClient) {}

  public create(file:{ name:string, file: File }, token: string): Observable<any> {
    
    const header = new HttpHeaders({
      JWTtoken: token
    });

    let formData = new FormData();
    formData.append(file.name, file.file);  

    return this.http.post("http://localhost:3000/api/pictures", formData, {
      headers: header
    });
  }
}
