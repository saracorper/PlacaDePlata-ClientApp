import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private data = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  public list(key: string, value: string): void{
    
    this.storage.get(key);
    this.data[key] = value; // sacar el token de localstorage
    
  }
}
