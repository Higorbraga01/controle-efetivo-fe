import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/public-api';
import { EfetivoCadastroContainerComponent } from './containers/efetivo-cadastro-container/efetivo-cadastro-container.component';
import { EfetivoConsultaContainerComponent } from './containers/efetivo-consulta-container/efetivo-consulta-container.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: EfetivoConsultaContainerComponent,
  },
  {
    path: 'cadastro',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: EfetivoCadastroContainerComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class GerenciamentoEfetivoRoutingModule { }
