import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from 'src/app/services/picture.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'pdp-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  public userId: string;
  public valFullName: string;
  public valEmail: string;
  public valAvatar: string;
  public avatar: File;

  private user: IUser;

  constructor(private userService: UserService, 
    private store: LocalStorageService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
      this.userId = this.route.snapshot.params.userId;
      let token = this.store.read('token') as string;

      this.userService.get(this.userId, token).subscribe((user: IUser) => {
        this.user = user;

        this.valFullName = user.fullName;
        this.valEmail = user.email;
        if (user.avatar)
          this.valAvatar = user.avatar.url;
      });
  }

  public async updateProfile(): Promise<void> {

    const token = this.store.read('token') as string;
    let body = {
      fullName: this.valFullName,
      email: this.valEmail,
      avatar: ''
    };
    
    let newPicture;
    const newAvatar = { name: 'picture', file: this.avatar}
    if (this.valAvatar && this.avatar) {

      await this.pictureService.update(this.user.avatar._id, newAvatar, token).toPromise().then(pic => newPicture = pic);
      body.avatar = newPicture._id
    } else if (this.avatar) {
      
      await this.pictureService.create(newAvatar, token).toPromise().then(pic => newPicture = pic);
      body.avatar = newPicture._id
    } else {
      delete body.avatar;
    }

    this.userService.update(this.userId, body, token).subscribe((res: IUser) => {
      this.loginService.emitOnLogged(res)
      this.router.navigateByUrl(`profile/${this.userId}`);
    });
  }
}

interface IUser {
  _id: string,
  fullName: string,
  email: string,
  avatar: any
}
