import { Injectable, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private data = [];

  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  

  public save(key: string, value: string | boolean | number ):void {
    console.log('argumentos: ',key, value);
    this.storage.set(key, value);
    this.data[key]= value;

  }
}
