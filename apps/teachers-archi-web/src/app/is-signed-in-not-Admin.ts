import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInNotAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate([`/welcome`]);
      return false;
    }
    return true;
  }
}
