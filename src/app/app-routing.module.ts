import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/lib/guards/auth.guard';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotAllowedComponent } from './shared/components/not-allowed/not-allowed.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'gerenciamento',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/gerenciamento-efetivo/gerenciamento-efetivo.module')
        .then((m) => m.GerenciamentoEfetivoModule)
  },

  { path: '403', component: NotAllowedComponent },
  {
    path: '**', redirectTo: '/404',
    resolve: {
      url: 'externalUrlRedirectResolver',
    },
    data: {
      externalUrl: `${environment.FRONT_URL}`,
    },
  },
  { path: '404', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
