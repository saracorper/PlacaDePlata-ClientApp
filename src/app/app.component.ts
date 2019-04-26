import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'pdp-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public user: { 
    _id: string,
    fullName: string
  };

  constructor(private userService: UserService, private storage: LocalStorageService) {}

  
  
  ngOnInit(): void {
    
    // this.userService.get()
  }
}

