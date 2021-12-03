import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { LoadingBarService } from './../../services/loading-bar.service';
import { UserService } from '../../../service/user.service';
import moment from 'moment';

@Component({
  selector: 'shrd-base-wrapper',
  templateUrl: './base-wrapper.component.html',
  styleUrls: ['./base-wrapper.component.scss'],
})
export class BaseWrapperComponent implements OnInit, OnDestroy {
  private _sessionInterval: any;

  @Input() title: string;
  @Input() basePath: string;

  public tokenDuration: moment.Duration;

  private subs$: Subscription[] = [];

  constructor(
    private router: Router,
    public keycloak: KeycloakService,
    public userService: UserService,
    public loading: LoadingBarService
  ) {
    this.subs$.push(
      this.router.events
        .pipe(
          filter(
            (e) => e instanceof NavigationStart || e instanceof NavigationEnd
          )
        )
        .subscribe((e) => {
          if (e instanceof NavigationStart) {
            this.loading.start();
          } else {
            this.loading.end();
          }
        })
    );

    this.refreshTokenTime();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
    clearInterval(this._sessionInterval);
  }

  handleLogout(): void {
    clearInterval(this._sessionInterval);

    this.keycloak.logout();
  }

  showBtnCadastrar(): boolean {
    if (!this.userService.user?.roles || (this.userService.user?.roles.indexOf('ROLE_crud-indicadores') < 0)) {
      return false;
    }

    return true;
  }

  handleUserName(): string {
    return (
      this.userService.user?.nome
        .split(' ')
        .map((name: string) => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`)
        .concat('-')
        .concat(this.userService.user.organizacao.sigla || '?')
        .join(' ') || 'Usuário não identificado'
    );
  }

  /**
   * This func is an auth token handler.
   * It's not a session handler, the session has a limit time defined by keycloak
   * (Actually about ~3hrs)
   *
   * It will reset the token in 1st run or if the user interact with the screen
   * with 5 minutes left to expire
   */
  refreshTokenTime(): void {
    // if (
    //   !this.tokenDuration ||
    //   Math.round(this.tokenDuration.asMinutes()) <= 35
    // ) {
    //   this.keycloak.updateToken(-1).then((refreshed) => {
    //     if (refreshed) {
    //       const kc = this.keycloak.getKeycloakInstance();

    //       moment.locale('pt-br');
    //       const currentTime = moment().unix();

    //       const diffTime = kc.tokenParsed.exp + kc.timeSkew - currentTime;
    //       const interval = 1000;

    //       this.tokenDuration = moment.duration(diffTime, 's');

    //       if (diffTime > 0) {
    //         if (this._sessionInterval) {
    //           clearInterval(this._sessionInterval);
    //         }

    //         this._sessionInterval = setInterval(() => {
    //           if (this.keycloak.isTokenExpired()) {
    //             this.handleLogout();
    //           }

    //           this.tokenDuration = moment.duration(
    //             this.tokenDuration.asMilliseconds() - interval,
    //             'ms'
    //           );
    //         }, interval);
    //       }
    //     }
    //   });
    // }
  }

  @HostListener('document:click')
  handleOutsideClick(el: HTMLElement) {
    // this.refreshTokenTime();
  }
}
