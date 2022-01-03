import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/service/pessoa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gerenciamento-efetivo-consulta-container',
  templateUrl: './gerenciamento-efetivo-consulta-container.component.html',
  styleUrls: ['./gerenciamento-efetivo-consulta-container.component.scss']
})
export class GerenciamentoEfetivoConsultaContainerComponent implements OnInit {
  public subs$: Subscription[] = [];

  public pessoasCadastradas: Pessoa[];

  _breadcrumbItems: MenuItem[];
  _home: MenuItem;
  _activeTabMenuItem: MenuItem;


  constructor(private pessoaService: PessoaService) { 
    this.subs$.push(
    this.pessoaService.getAll().subscribe((res) => {
      this.pessoasCadastradas = res.content;
      // this.pageablePageSize = res.size;
      // this.pageableTotalRecords = res.totalElements;
    })
  ); }

  ngOnInit(): void {
    this._breadcrumbItems = [
      { label: 'Gerenciamento Efetivo', disabled: false },
    ];

    this._home = {
      icon: 'pi pi-home',
      url: environment.FRONT_URL,
    };
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  handleBreadcrumbClick(e: any) {
    if (!e.item.icon) {
      this._breadcrumbItems[
        this._breadcrumbItems.indexOf(e.item)
      ].disabled = true;
    }
  }

}
