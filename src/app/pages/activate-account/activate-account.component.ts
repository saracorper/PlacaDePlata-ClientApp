import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pdp-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    
    let token = '';
    this.route.queryParams.subscribe(params => {

      token = params.token;
      console.log('activationToken :', params.token);

      let userBody = {
        confirmAt: new Date()
      }

      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token);

      console.log('decoded :', decoded);

      this.userService.update(decoded.user._id, userBody, token).subscribe(user => {
        console.log('updated user:  ', user );
      })
    });
  }

}
