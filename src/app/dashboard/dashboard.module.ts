import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { NoDashboardYetModule } from '../shared/components/no-dashboard-yet/no-dashboard-yet.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NoDashboardYetModule,
    CardModule,
    DialogModule,
    TableModule,
    ButtonModule,
    ChartModule

  ]
})
export class DashboardModule { }
