import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'pdp-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {

  public activating: boolean = true;
  public invalidToken: boolean = false;

  constructor(private route: ActivatedRoute,
     private userService: UserService,
     private router: Router,
     private storage: LocalStorageService,
     private toastyService: ToastyService,
     private toastyConfig: ToastyConfig,
     private loginService: LoginService
    ) { }

  ngOnInit() {
    
    let token = '';
    this.route.queryParams.subscribe(params => {

      token = params.token;

      let userBody = {
        confirmAt: new Date()
      }

      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token);

      if(!decoded){
        this.activating = false;
        this.invalidToken = true;
      }

      this.userService.update(decoded.user._id, userBody, token).subscribe(
        user => {
          this.loginService.emitOnLogged(user);
          this.storage.save('token',token);
          this.router.navigateByUrl('gallery');
        },
        error => {
          let config = {
            title: 'Error.',
            msg: 'Expirado el tiempo de activación.',
            showClose: true,
            timeout: 3000,
            theme: 'bootstrap'
          };
          
          if (error.status == 401 || error.status == 404) {
            this.activating = false;
            this.invalidToken = true;
            this.toastyService.error(config);
          } else {
            config.msg = "Se ha producido un error inesperado";
            this.toastyService.error(config);
          }
        }) 
    });
  }

}
