import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { NoDashboardYetModule } from '../shared/components/no-dashboard-yet/no-dashboard-yet.module';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NoDashboardYetModule
  ]
})
export class DashboardModule { }
