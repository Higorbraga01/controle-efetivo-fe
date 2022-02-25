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
  public inspecaoSelecDropdown: any;
  public menuItems: MenuItem[];
  public loadingData = true;
  private readonly NUMCOLUMNS = 8;
  public fakeArrayColumns = new Array(this.NUMCOLUMNS).fill({});
  public fakeArrayRows: any = [];
  public hoje: Moment;
  private rowsCount: number;
  public pessoas: Pessoa[];
  public inspecaoList: Inspecao[];
  private unidadeId: string;

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
    this.sharedService.currentMessage.subscribe(() =>{
      if (JSON.parse(sessionStorage.getItem('unidade'))) {
        this.unidadeId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
      } else {
        this.unidadeId = this.userService?.user?.organizacao !=null ? this.userService?.user?.organizacao?.id: '0000';
      }
      this.updateTable({ first: 0, rows: 10 })
    });
  }

  updateTable(event: LazyLoadEvent): void {
    this.rowsCount = event.rows;
    this.fakeArrayRows = new Array(event.rows).fill({});

    const page = { page: (event.first / event.rows) };
    const size = { size: event.rows };
    const pessoa = { nomePessoa: this.form?.value?.nomePessoa?.value };
    const unidade = { unidadeId: this.unidadeId};
    let searchObject = {};
    if (event.sortField) {
      const sort = { sort: `${event.sortField},${event.sortOrder === 1 ? 'ASC' : 'DESC'}` };
      searchObject = Object.assign({},unidade, pessoa, page, size, sort);
    } else {
      searchObject = Object.assign({},unidade, pessoa,page, size);
    }

    this.loading.start();
    const getPessoas$ =  this.inspecaoService.getAll(searchObject).pipe(share());
    const isLoading$ = of(
      timer(200).pipe(mapTo(true), takeUntil(getPessoas$)),
      getPessoas$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe(result => {
        this.loadingData = result;
      }),
      getPessoas$.subscribe((res: { content: Inspecao[]; totalElements: number; }) => {
        this.inspecaoList = res.content;
        this.totalRecords = res.totalElements;
        this.loading.end();
      })
    );
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir esta pessoa?',
      accept: () => {
        this.loading.start();
        this.subs$.push(
          this.inspecaoService.delete(id)
            .subscribe(
              () => {
                this.loading.end();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Pessoa excluida com sucesso',
                  life: 3000
                });
                this.updateTable({ first: 0, rows: this.rowsCount });
              },
              (_e: any) => this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir pessoa',
                life: 3000
              })));
        this.loading.end();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  searchPessoas(event: any): void {
    this.subs$.push(
      this.pessoaService.getAllSearch({unidadeId: this.unidadeId ,nomePessoa: event.query })
        .subscribe((response: { content: any }) => {
          this.pessoas = response.content.map((pessoas: { nomePessoa: string, nomeGuerra: string, posto: Posto}) => ({
            label: pessoas.nomePessoa,
            title: pessoas.posto.siglaPosto + " "+  pessoas.nomeGuerra,
            value: pessoas.nomePessoa
          }));
        })
    );

  }

  onClear(): void {
    this.form.reset();
    this.updateTable({ first: 0, rows: this.rowsCount });
  }


  createMenuItens(): MenuItem[] {
    return [
      {
        label: 'Editar', icon: 'pi pi-pencil',
        routerLink: ['', 'editar', this.inspecaoSelecDropdown?.id],
        // visible: this.userService?.user?.roles.includes('ROLE_crud-habilitacao-instrucao')
        disabled:true
      },
      {
        label: 'Detalhe Inspeção', icon: 'pi pi-info-circle',
        routerLink: [this.inspecaoSelecDropdown?.id, 'detalhe'],
        disabled: this.actionDisable()
      },
      {
        label: 'Excluir', icon: 'pi pi-trash',
        command: () => this.delete(this.inspecaoSelecDropdown?.id),
        // visible: this.userService?.user?.roles.includes('ROLE_crud-habilitacao-instrucao')
        disabled: this.actionDisable()
      },

    ];
  }

  handleBreadcrumbClick(e: any) {
    if (!e.item.icon) {
      this._breadcrumbItems[
        this._breadcrumbItems.indexOf(e.item)
      ].disabled = true;
    }
  }

  onDropdownClick($event: any, pessoa: any): void {
    this.inspecaoSelecDropdown = pessoa;
    this.menuItems = this.createMenuItens();
  }

  actionDisable(): boolean {
    if (this.userService.user?.roles?.includes('ROLE_ADMINISTRADOR')) {
      return false;
    }
    return true;
  }
}
