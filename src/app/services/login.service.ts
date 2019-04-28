import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private onLoggedSub = new BehaviorSubject<IUser>(null);

  constructor(private http: HttpClient) { }

  public log(body: { email: string, password: string }): Observable <{ token: string }>{
    return this.http.post<{ token: string }>('http://localhost:3000/api/login', body);
  }

  public getOnLogged(): BehaviorSubject<IUser> {

    return this.onLoggedSub;
  }

  public emitOnLogged(user: IUser): void {

    this.onLoggedSub.next(user);
  }

  public refreshActivationLink(body: {email: string}): Observable<any> {
    
    return this.http.post('http://localhost:3000/api/login/refresh-link', body);
  } 
}

interface IUser {
  _id: string,
  fullName: string
}