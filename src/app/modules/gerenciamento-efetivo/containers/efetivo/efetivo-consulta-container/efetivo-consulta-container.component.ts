import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { SelectItem } from 'primeng/api/selectitem';
import { of, Subscription, timer } from 'rxjs';
import { mapTo, mergeAll, share, takeUntil } from 'rxjs/operators';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Posto } from 'src/app/models/Posto';
import { PessoaService } from 'src/app/service/pessoa.service';
import { RelatorioService } from 'src/app/service/relatorio.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-efetivo-consulta-container',
  templateUrl: './efetivo-consulta-container.component.html',
  styleUrls: ['./efetivo-consulta-container.component.scss'],
})
export class EfetivoConsultaContainerComponent implements OnInit {
  public subs$: Subscription[] = [];
  public pessoas: SelectItem[];
  public totalRecords: number;
  public loadingData = true;
  private readonly NUMCOLUMNS = 8;
  public fakeArrayColumns = new Array(this.NUMCOLUMNS).fill({});
  public fakeArrayRows: any = [];
  public dtAtual: Date = new Date();
  public dtString: String;
  public first: number = 0;
  private rowsCount: number;
  public pessoasList: Pessoa[];
  public disabled: boolean = true;
  private unidadeId: string;
  private nomeUnidade: string;
  private nomePessoa: string;
  private isTtc: string = "-";
  private situacao: string[] = ['ATIVO'];
  private sort = {sort: 'numeroAntiguidade'};
  public opcoesFiltroEfetivo: any[];

  _breadcrumbItems: MenuItem[];
  _home: MenuItem;
  _activeTabMenuItem: MenuItem;

  constructor(
    private loading: LoadingBarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public userService: UserService,
    public pessoaService: PessoaService,
    public relatorioService: RelatorioService,
    private sharedService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.opcoesFiltroEfetivo = [
      {name: 'Ativo', value: 1},
      {name: 'Tarefa', value: 2},
      {name: 'Civil', value: 3}
  ];
    this.dtString = this.dtAtual.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
    this._breadcrumbItems = [{ label: 'Lista Efetivo', disabled: false }];
    this._home = {
      icon: 'pi pi-home',
      url: environment.FRONT_URL,
    };
    this.sharedService.currentMessage.subscribe((message) =>{
      if (message.length != 0) {
        this.unidadeId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
        this.nomeUnidade = JSON.parse(sessionStorage.getItem('unidade'))?.sigla
        this.updateTable({ first: 0, rows: 10 });
      } else {
        this.unidadeId = this.userService?.user?.organizacao !=null ? this.userService?.user?.organizacao?.id : '0000';
        this.nomeUnidade = this.userService?.user?.organizacao?.sigla
      }
    });
  }

  selectTipoEfetivo(formValue: any){
    if(formValue == 1){
      this.situacao = ['ATIVO'];
      this.isTtc = '-';
      this.sort = {sort: 'numeroAntiguidade'};
      this.updateTable({first: this.first, rows:this.rowsCount});
    }
    if(formValue == 2){
      this.situacao =  ['INAT'];
      this.isTtc = 'TTC';
      this.sort = {sort: 'numeroPosto'};
      this.updateTable({first: 0, rows:this.rowsCount});
    }
    if(formValue == 3) {
      this.situacao = ['CVL'];
      this.isTtc = '-';
      this.sort = {sort: 'numeroAntiguidade'};
      this.updateTable({first: this.first, rows:this.rowsCount});
    }
  }

  pessoaFilter(event: any){
    if(event){
      this.nomePessoa = event;
      this.updateTable({first: 0, rows:0})
    }else {
      this.nomePessoa = null
      this.isTtc = '-'
      this.onClear();
    }
  }

  updateTable(event: LazyLoadEvent): void {
    this.rowsCount = event.rows;
    this.first = event.first;
    this.fakeArrayRows = new Array(event.rows).fill({});
    const page = { page: event.first / event.rows };
    const size = { size: event.rows };
    const pessoa = { nomePessoa: this.nomePessoa };
    const unidade = { unidadeId: this.unidadeId };
    const situacao= { inAtivo: this.situacao}
    const tipoEfetivo = { ttc: this.isTtc};
    let searchObject = {};
    if (event.sortField) {
      const sort = {
        sort: `${event.sortField},${event.sortOrder === 1 ? 'ASC' : 'DESC'}`,
      };
      searchObject = Object.assign({}, unidade, pessoa,situacao, tipoEfetivo, page, size, this.sort);
    } else {
      searchObject = Object.assign({}, unidade, pessoa,situacao, tipoEfetivo, page, size,this.sort);
    }

    this.loading.start();
    const getPessoas$ = this.pessoaService
      .getAllSearch(searchObject)
      .pipe(share());
    const isLoading$ = of(
      timer(1000).pipe(mapTo(true), takeUntil(getPessoas$)),
      getPessoas$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((result) => {
        this.loadingData = result;
      }),
      getPessoas$.subscribe(
        (res: { content: Pessoa[]; totalElements: number }) => {
          this.pessoasList = res.content;
          this.totalRecords = res.totalElements;
          this.loading.end();
        }
      )
    );
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir esta pessoa?',
      accept: () => {
        this.loading.start();
        this.subs$.push(
          this.pessoaService.delete(id).subscribe(
            () => {
              this.updateTable({ first: 0, rows: this.rowsCount });
              this.loading.end();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Pessoa excluida com sucesso',
                life: 3000,
              });
            },
            (_e: any) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir pessoa',
                life: 3000,
              })
          )
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  searchPessoas(event: any): void {
    if(event){
      let searchObject = Object.assign({
        nomePessoa: event.query,
        unidadeId: this.unidadeId,
        inAtivo: this.situacao,
        ttc: this.isTtc}, this.sort);
      this.subs$.push(
        this.pessoaService
          .getAllSearch(searchObject)
          .subscribe((response: { content: any }) => {
            console.log(response)
            this.pessoas = response.content.map(
              (pessoas: {
                nome: string;
                nomeGuerra: string;
                posto: Posto;
              }) => ({
                label: pessoas.nome,
                title: pessoas.posto ? pessoas.posto + ' '+ pessoas.nomeGuerra : "CV " + pessoas.nomeGuerra,
                value: pessoas.nome,
              })
            );
          })
      );
    } else {
     this.selectTipoEfetivo(1);
    }
  }

  onClear(): void {
    this.updateTable({ first: 0, rows: this.rowsCount });
  }

  handleBreadcrumbClick(e: any) {
    if (!e.item.icon) {
      this._breadcrumbItems[this._breadcrumbItems.indexOf(e.item)].disabled =
        true;
    }
  }

  actionDisable(): boolean {
    if (
      this.userService.user?.roles?.includes('ROLE_GERENTE_SPM' ||'ROLE_ADMINISTRADOR')
    ) {
      return false;
    }
    return true;
  }

  gerarRelatorio() {
    let params = {};
    params = Object.assign({},  {tipoEfetivo: this.isTtc}, {situacao: this.situacao})
    this.loading.start();
    this.subs$.push(
      this.relatorioService.gerarRelatorio(this.unidadeId,params).subscribe(
        (response) => {
          let blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = url;
          link.href = url;
          link.download =
            'relacao-efetivo-' + this.nomeUnidade + '-' + this.dtString + '.pdf';
          link.click();
          this.loading.end();
        },
        (_e: any) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao gerar lista do efetivo',
            life: 3000,
          })
      )
    );
  }
}
