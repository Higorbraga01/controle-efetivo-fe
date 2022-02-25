import { Organizacao } from './../../../models/organizacao.model';
import { User } from './../../../models/user.model';
import { OrganizacaoService } from './../../../service/organizacao.service';
import { async } from '@angular/core/testing';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { LoadingBarService } from './../../services/loading-bar.service';
import { UserService } from '../../../service/user.service';
import moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'shrd-base-wrapper',
  templateUrl: './base-wrapper.component.html',
  styleUrls: ['./base-wrapper.component.scss'],
})
export class BaseWrapperComponent implements OnInit, OnDestroy {
  private _sessionInterval: any;
  public organizacoes: Organizacao[];
  public form: FormGroup;
  public nomeUnidade: string;
  private disableUnidadeDropDown: boolean = true;

  @Input() title: string;
  @Input() basePath: string;
  public tokenDuration: moment.Duration;

  private subs$: Subscription[] = [];

  constructor(
    private router: Router,
    public keycloak: KeycloakService,
    public userService: UserService,
    public organizacaoService: OrganizacaoService,
    public loading: LoadingBarService,
    private fb: FormBuilder,
    private sharedService: SharedDataService
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
    this.form = this.fb.group({
      unidadeId: this.fb.control({
        value: null,
        disabled: this.disableUnidadeDropDown,
      }),
    });
    this.organizacaoService.buscarTodasOrganizacoes().subscribe((res) => {
      this.organizacoes = res;
      this.userService.getCurrentUser().subscribe((user) => {
        this.organizacaoService
          .buscarOrganizacaoPorId(user.organizacao?.id)
          .subscribe((organizacao) => {
            if (sessionStorage.getItem('unidade')) {
              this.form
                .get('unidadeId')
                .patchValue(JSON.parse(sessionStorage.getItem('unidade')));
            } else {
              this.form.get('unidadeId').patchValue(organizacao);
            }
          });
      });
    });
    // this.userService.getCurrentUser().subscribe(user => this.enableUnidadeDropDown = user?.roles?.includes('ROLE_ADMINISTRADOR') )
    this.actionDisable();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
    clearInterval(this._sessionInterval);
  }

  unidadeChanged(value: any) {
    sessionStorage.setItem('unidade', JSON.stringify(value));
    this.sharedService.changeMessage(true);
  }

  handleLogout(): void {
    clearInterval(this._sessionInterval);
    sessionStorage.clear();
    this.keycloak.logout();
  }

  showBtnCadastrar(): boolean {
    if (
      !this.userService.user?.roles ||
      this.userService.user?.roles.indexOf('ROLE_crud-indicadores') < 0
    ) {
      return false;
    }
    return true;
  }

  handleUserName(): string {
    return (
      this.userService.user?.nome
        ?.split(' ')
        ?.map(
          (name: string) =>
            `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`
        )
        ?.concat('-')
        ?.concat(this.userService.user.organizacao?.sigla || '?')
        ?.join(' ') || 'Usuário não identificado'
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
    if (
      !this.tokenDuration ||
      Math.round(this.tokenDuration.asMinutes()) <= 35
    ) {
      this.keycloak.updateToken(-1).then((refreshed) => {
        if (refreshed) {
          const kc = this.keycloak.getKeycloakInstance();

          moment.locale('pt-br');
          const currentTime = moment().unix();

          const diffTime = kc.tokenParsed.exp + kc.timeSkew - currentTime;
          const interval = 1000;

          this.tokenDuration = moment.duration(diffTime, 's');

          if (diffTime > 0) {
            if (this._sessionInterval) {
              clearInterval(this._sessionInterval);
            }

            this._sessionInterval = setInterval(() => {
              if (this.keycloak.isTokenExpired()) {
                this.handleLogout();
              }

              this.tokenDuration = moment.duration(
                this.tokenDuration.asMilliseconds() - interval,
                'ms'
              );
            }, interval);
          }
        }
      });
    }
  }

  actionDisable(): any {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user.roles?.includes('ROLE_ADMINISTRADOR')) {
        this.disableUnidadeDropDown = false;
        this.form.get('unidadeId').enable();
        return false;
      }
      this.disableUnidadeDropDown = true;
      this.form.get('unidadeId').disable();
      return true;
    });
  }

  @HostListener('document:click')
  handleOutsideClick(el: HTMLElement) {
    this.refreshTokenTime();
  }
}
