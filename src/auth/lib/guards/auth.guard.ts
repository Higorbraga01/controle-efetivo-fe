import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../app/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivateChild {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected userService: UserService
  ) {
    super(router, keycloak);
  }

  private handleUserRoles(requiredRoles: ActivatedRouteSnapshot): boolean {
    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.every((role) => this.roles.includes(role))) {
      this.router.navigate(['403']);
      return false;
    }

    // Allow the user to proceed if all the required roles are present.
    return true;
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      try {
        if (!this.userService.user) {
          const user = await this.userService
            .getCurrentUser()
            .toPromise();

          this.userService.user = {
            id: user.pessoa.id,
            nome: user.pessoa.nomePessoa,
            nrCpf: user.pessoa.numeroCpf,
            organizacao: user.pessoa.unidade,
            roles: user.roles
          };
        }
      } catch (err) {
        this.userService.user = {
          id: -1,
          nome: null,
          nrCpf: null,
          roles: null,
          organizacao: null
        };
      }
    }

    return this.handleUserRoles(route.data?.roles);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.handleUserRoles(route.data?.roles);
  }
}
