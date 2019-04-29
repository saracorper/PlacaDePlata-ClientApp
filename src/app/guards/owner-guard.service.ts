import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  
  constructor(private storage: LocalStorageService,
    private router: Router,

    
    
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    let token = this.storage.read("token") as string;

    let helper = new JwtHelperService();
    let decoded = helper.decodeToken(token);

    let ownerId = route.params.userId;
    if (ownerId !== decoded.user._id) {

      this.router.navigateByUrl('not-authorized')
      return false;
    }

    return true;
  }
}
