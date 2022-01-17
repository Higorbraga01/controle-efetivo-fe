import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: null,
  },
  {
    path: 'cadastro/inspecao',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: null,
  },
  {
    path: 'detalhe/inspecao/:id',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: null,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoInspecaoRoutingModule { }
