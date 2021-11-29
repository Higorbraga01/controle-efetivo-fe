import { HomeComponent } from './containers/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: HomeComponent }];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule { }
