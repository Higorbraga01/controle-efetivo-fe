import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspecaoCadastroContainerComponent } from './inspecao-cadastro-container/inspecao-cadastro-container.component';
import { InspecaoConsultaContainerComponent } from './inspecao-consulta-container/inspecao-consulta-container.component';
import { InspecaoDetalheContainerComponent } from './inspecao-detalhe-container/inspecao-detalhe-container.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: InspecaoConsultaContainerComponent,
  },
  {
    path: 'cadastro',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: InspecaoCadastroContainerComponent,
  },
  {
    path: ':id/detalhe',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: InspecaoDetalheContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoInspecaoRoutingModule { }
