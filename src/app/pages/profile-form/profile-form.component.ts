import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from 'src/app/services/picture.service';

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
    private pictureService: PictureService) { }

  ngOnInit() {
      this.userId = this.route.snapshot.params.id;
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
    
    let newPicture;
    const newAvatar = { name: 'picture', file: this.avatar}
    if (this.valAvatar) 
      await this.pictureService.update(this.user.avatar._id, newAvatar, token).toPromise().then(pic => newPicture = pic);
    else 
      await this.pictureService.create(newAvatar, token).toPromise().then(pic => newPicture = pic);
    
    
    let body = {
      fullName: this.valFullName,
      email: this.valEmail,
      avatar: newPicture._id
    };

    this.userService.update(this.userId, body, token).subscribe(res => console.log('res :', res));
  }
}

interface IUser {
  fullName: string,
  email: string,
  avatar: any
}
