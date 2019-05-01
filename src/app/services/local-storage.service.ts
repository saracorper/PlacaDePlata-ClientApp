import { Injectable, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private data = [];

  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  

  public save(key: string, value: string | boolean | number ):void {

    this.storage.set(key, value);
    this.data[key]= value;
  }

  public read(key: string): string | boolean | number {

    let value = this.data[key];

    return value || this.storage.get(key);
  }

  public delete(key: string): void{

    this.storage.remove(key);
    this.data = this.data.filter(i => i !== key);
  }
}


