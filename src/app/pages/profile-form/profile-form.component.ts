import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pdp-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  public userId: string;
  public valFullName: string;
  public valEmail: string;
  public avatar: File;

  constructor(private userService: UserService, 
    private store: LocalStorageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.userId = this.route.snapshot.params.id;
  }

  public async updateProfile(): Promise<void> {

    let token = this.store.read('token') as string;
    
    let body = {
      fullName: this.valFullName,
      email: this.valEmail
    };

    await this.userService.update(this.userId, body, token).toPromise().then(res => console.log('res :', res));
  }
}
