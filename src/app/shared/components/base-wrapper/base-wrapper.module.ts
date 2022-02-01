import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseWrapperComponent } from './base-wrapper.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';

import { LoadingBarModule } from './../loading-bar/loading-bar.module';
import { LoadingBarService } from './../../services/loading-bar.service';

import { RequestInterceptor } from '../../interceptors/request-interceptor';
import { LoggingInterceptor } from './../../interceptors/logging-interceptor';
import { SidenavModule } from '../sidenav/sidenav.module';


@NgModule({
  declarations: [BaseWrapperComponent],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    LoadingBarModule,
    ToastModule,
    RouterModule,
    SidenavModule,
    DropdownModule,
    ReactiveFormsModule

  ],
  exports: [BaseWrapperComponent],
  providers: [
    LoadingBarService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
  ],
})
export class BaseWrapperModule { }
