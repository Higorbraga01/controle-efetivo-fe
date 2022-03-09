import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import moment, { Moment } from 'moment';
import { SelectItem, MenuItem, MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription, of, timer } from 'rxjs';
import { share, mapTo, takeUntil, mergeAll } from 'rxjs/operators';
import { Inspecao } from 'src/app/models/inspecao.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Posto } from 'src/app/models/Posto';
import { InspecaoService } from 'src/app/service/inspecao.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'controle-inspecao-consulta-container',
  templateUrl: './inspecao-consulta-container.component.html',
  styleUrls: ['./inspecao-consulta-container.component.scss']
})
export class InspecaoConsultaContainerComponent implements OnInit {
  public subs$: Subscription[] = [];
  public form: FormGroup;
  public inspecao: SelectItem[];
  public totalRecords: number;
  public loadingData = true;
  private readonly NUMCOLUMNS = 8;
  public fakeArrayColumns = new Array(this.NUMCOLUMNS).fill({});
  public fakeArrayRows: any = [];
  public hoje: Moment;
  public first: number = 0;
  private rowsCount: number;
  public pessoas: any;
  public inspecaoList: Inspecao[];
  private orgId: string;
  private orgServicoId: string;
  private nomePessoa: string;
  private isTtc: string = "-";
  private situacao: string[] = ['ATIVO'];
  private sort = {sort: 'pessoaInspecionada.numeroAntiguidade'};
  public opcoesFiltroEfetivo: any[];

  _breadcrumbItems: MenuItem[];
  _home: MenuItem;

  _activeTabMenuItem: MenuItem;


  constructor(
    private loading: LoadingBarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public userService: UserService,
    private sharedService: SharedDataService,
    public inspecaoService: InspecaoService,
    public pessoaService: PessoaService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.opcoesFiltroEfetivo = [
      {name: 'Ativo', value: 1},
      {name: 'Tarefa', value: 2},
      {name: 'Civil', value: 3}
  ];
    this.form = this.fb.group({
      nomePessoa: this.fb.control(null)
    });
    this.hoje = moment(new Date).startOf('day');
    this._breadcrumbItems = [
      { label: 'Lista Inspeções', disabled: false },
    ];
    this._home = {
      icon: 'pi pi-home',
      url: environment.FRONT_URL,
    };
    this.sharedService.currentMessage.subscribe((message) =>{
      if (message.length != 0) {
        this.orgId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
        this.orgServicoId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
        this.updateTable({ first: 0, rows: 10 })
      } else {
        this.orgId = this.userService?.user?.organizacao !=null ? this.userService?.user?.organizacao?.id: '0000';
        this.orgServicoId = this.userService?.user?.organizacao !=null ? this.userService?.user?.organizacao?.id: '0000';
      }
    });
  }

  selectTipoEfetivo(formValue: any){
    if(formValue == 1){
      this.situacao = ['ATIVO'];
      this.isTtc = '-';
      this.sort = {sort: 'pessoaInspecionada.numeroAntiguidade'+ ','+ 'agenda.dataAgenda'};
      this.updateTable({first: 0, rows:this.rowsCount});
    }
    if(formValue == 2){
      this.situacao =  ['INAT'];
      this.isTtc = 'TTC';
      this.sort = {sort: 'pessoaInspecionada.numeroPosto'+ ',' +'pessoaInspecionada.dataPromocaoAtual'+ ','+ 'agenda.dataAgenda'};
      this.updateTable({first: 0, rows:this.rowsCount});
    }
    if(formValue == 3) {
      this.situacao = ['CVL'];
      this.isTtc = '-';
      this.sort = {sort: 'pessoaInspecionada.numeroAntiguidade'+ ','+ 'agenda.dataAgenda'};
      this.updateTable({first: 0, rows:this.rowsCount});
    }
  }

  pessoaFilter(event: any){
    if(event){
      this.nomePessoa = event;
      this.updateTable({first: 0, rows:0})
    }else {
      this.nomePessoa = null
      this.isTtc = '-'
      this.situacao = ['ATIVO']
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
    const organizacao = { orgId: this.orgId };
    const organizacaoServico = { orgServicoId: this.orgServicoId };
    const situacao= { inAtivo: this.situacao}
    const tipoEfetivo = { ttc: this.isTtc};
    let searchObject = {};
    if (event.sortField) {
      const sort = {
        sort: `${event.sortField},${event.sortOrder === 1 ? 'ASC' : 'DESC'}`,
      };
      searchObject = Object.assign({}, organizacao,organizacaoServico,pessoa,situacao,tipoEfetivo,page,size,this.sort);
    } else {
      searchObject = Object.assign({}, organizacao,organizacaoServico,pessoa,situacao,tipoEfetivo,page,size,this.sort);
    }

    this.loading.start();
    const getInspecoes$ = this.inspecaoService
      .getAll(searchObject)
      .pipe(share());
    const isLoading$ = of(
      timer(1000).pipe(mapTo(true), takeUntil(getInspecoes$)),
      getInspecoes$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((result) => {
        this.loadingData = result;
      }),
      getInspecoes$.subscribe(
        (res: { content: Inspecao[]; totalElements: number }) => {
          this.inspecaoList = res.content;
          this.totalRecords = res.totalElements;
          this.loading.end();
        }
      )
    );
  }

  delete(id: number): void {
    // this.confirmationService.confirm({
    //   message: 'Deseja excluir esta inspeção?',
    //   accept: () => {
    //     this.loading.start();
    //     this.subs$.push(
    //       this.inspecaoService.delete(id)
    //         .subscribe(
    //           () => {
    //             this.loading.end();
    //             this.messageService.add({
    //               severity: 'success',
    //               summary: 'Sucesso',
    //               detail: 'Inspeção excluida com sucesso',
    //               life: 3000
    //             });
    //             this.updateTable({ first: 0, rows: this.rowsCount });
    //           },
    //           (_e: any) => this.messageService.add({
    //             severity: 'error',
    //             summary: 'Erro',
    //             detail: 'Erro ao excluir inspeção',
    //             life: 3000
    //           })));
    //     this.loading.end();
    //   }
    // });
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
        orgId: this.orgId,
        orgServicoId: this.orgServicoId,
        inAtivo: this.situacao,
        ttc: this.isTtc},{sort: 'numeroAntiguidade'});
      this.subs$.push(
        this.pessoaService
          .getAllSearch(searchObject)
          .subscribe((response: { content: any }) => {
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
    this.form.reset();
    this.updateTable({ first: 0, rows: this.rowsCount });
  }

  handleBreadcrumbClick(e: any) {
    if (!e.item.icon) {
      this._breadcrumbItems[
        this._breadcrumbItems.indexOf(e.item)
      ].disabled = true;
    }
  }

  actionDisable(): boolean {
    if (this.userService.user?.roles?.includes( 'ROLE_GERENTE_SPM' ||'ROLE_ADMINISTRADOR')) {
      return false;
    }
    return true;
  }
}
