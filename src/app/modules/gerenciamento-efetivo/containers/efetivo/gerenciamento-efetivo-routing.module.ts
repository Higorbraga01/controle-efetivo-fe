import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/public-api';
import { EfetivoCadastroContainerComponent } from './efetivo-cadastro-container/efetivo-cadastro-container.component';
import { EfetivoConsultaContainerComponent } from './efetivo-consulta-container/efetivo-consulta-container.component';
import { EfetivoDetalheContainerComponent } from './efetivo-detalhe-container/efetivo-detalhe-container.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: EfetivoConsultaContainerComponent,
  },
  {
    path: 'cadastro/pessoa',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: EfetivoCadastroContainerComponent,
  },
  {
    path: 'detalhe/pessoa/:id',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: EfetivoDetalheContainerComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class GerenciamentoEfetivoRoutingModule { }
