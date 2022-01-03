import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { SelectItem } from 'primeng/api/selectitem';
import { Observable, of, Subscription, timer } from 'rxjs';
import { mapTo, mergeAll, share, takeUntil } from 'rxjs/operators';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/service/pessoa.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-efetivo-consulta-container',
  templateUrl: './efetivo-consulta-container.component.html',
  styleUrls: ['./efetivo-consulta-container.component.scss']
})
export class EfetivoConsultaContainerComponent implements OnInit {

  public habilitacoesInstrutoresCadastradas: any[];
  public subs$: Subscription[] = [];
  public form: FormGroup;
  public pessoas: SelectItem[];
  public cursos: SelectItem[];
  public totalRecords: number;
  public pessoaSelecDropdown: any;
  public menuItems: MenuItem[];
  public loadingData = true;
  private readonly NUMCOLUMNS = 8;
  public fakeArrayColumns = new Array(this.NUMCOLUMNS).fill({});
  public fakeArrayRows: any = [];
  public dtAtual: Date;
  private rowsCount: number;

  public pessoasList: Pessoa[];

  _breadcrumbItems: MenuItem[];
  _home: MenuItem;

  _activeTabMenuItem: MenuItem;

  constructor(
    // private facade: HabilitacaoInstrutorFacade,
    private loading: LoadingBarService,
    private messageService: MessageService,
    // public userService: UserService,
    public pessoaService: PessoaService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nomePessoa: this.fb.control(null)
    });

    this.dtAtual = new Date();
    this.pessoaService.getAllSearch().pipe().subscribe(res => {
      this.pessoasList = res.content;
      
    });

    this._breadcrumbItems = [
      { label: 'Gerenciamento Efetivo', disabled: false },
    ];

    this._home = {
      icon: 'pi pi-home',
      url: environment.FRONT_URL,
    };
  }

  

  updateTable(event: LazyLoadEvent): void {
    this.rowsCount = event.rows;
    this.fakeArrayRows = new Array(event.rows).fill({});
    
    const page = { page: (event.first / event.rows) };
    const size = { size: event.rows };
    const pessoa = { nomePessoa: this.form?.value?.nomePessoa?.value };
    let searchObject = {};
    if (event.sortField) {
      const sort = { sort: `${event.sortField},${event.sortOrder === 1 ? 'ASC' : 'DESC'}` };
      searchObject = Object.assign({}, pessoa, page, size, sort);
    } else {
      searchObject = Object.assign({}, pessoa,page, size);
    }

    this.loading.start();
    const getPessoas$ =  this.pessoaService.getAllSearch(searchObject).pipe(share());
    const isLoading$ = of(
      timer(200).pipe(mapTo(true), takeUntil(getPessoas$)),
      getPessoas$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe(result => {
        this.loadingData = result;
      }),
      getPessoas$.subscribe((res: { content: Pessoa[]; totalElements: number; }) => {
        this.pessoasList = res.content;
        this.totalRecords = res.totalElements;
        this.loading.end();
      })
    );
  }

  delete(id: number): void {
    // this.confirmationService.confirm({
    //   message: 'Deseja apagar a Habilitação?',
    //   accept: () => {
    //     this.loading.start();
    //     this.subs$.push(
    //       this.facade.delete(id)
    //         .subscribe(
    //           () => {
    //             this.loading.end();
    //             this.messageService.add({
    //               severity: 'success',
    //               summary: 'Sucesso',
    //               detail: 'Habilitação apagada com sucesso',
    //               life: 3000
    //             });
    //             this.listHabilitacoesCadastradas({ first: 0, rows: this.rowsCount });
    //           },
    //           (              e: any) => this.messageService.add({
    //             severity: 'error',
    //             summary: 'Erro',
    //             detail: 'Erro ao apagar Habilitação',
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
    this.subs$.push(
      this.pessoaService.getAllSearch({ nomePessoa: event.query })
        .subscribe((response: { content: any }) => {
          this.pessoas = response.content.map((pessoas: { nomePessoa: string, nomeGuerra: string}) => ({
            label: pessoas.nomePessoa,
            title: pessoas.nomeGuerra,
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
        routerLink: ['/habilitacao-instrutor', 'editar', this.pessoaSelecDropdown?.id],
        // visible: this.userService?.user?.roles.includes('ROLE_crud-habilitacao-instrucao')
      },
      {
        label: 'Detalhe Habilitação', icon: 'pi pi-info-circle',
        routerLink: ['/habilitacao-instrutor', 'detalhar-habilitacao', this.pessoaSelecDropdown?.id]
      },
      {
        label: 'Excluir', icon: 'pi pi-trash',
        command: () => this.delete(this.pessoaSelecDropdown?.id),
        // visible: this.userService?.user?.roles.includes('ROLE_crud-habilitacao-instrucao')
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
    this.pessoaSelecDropdown = pessoa;
    this.menuItems = this.createMenuItens();
  }

  encerrarHabilitacao(id: number): void {
    // this.confirmationService.confirm({
    //   message: 'Deseja encerrar essa Habilitação?',
    //   accept: () => {
    //     this.loading.start();
    //     this.subs$.push(
    //       this.facade.encerrarHabilitacao(id)
    //         .subscribe(
    //           () => {
    //             this.loading.end();
    //             this.messageService.add({
    //               severity: 'success',
    //               summary: 'Sucesso',
    //               detail: 'Habilitação encerrada com sucesso',
    //               life: 3000
    //             });
    //             this.listHabilitacoesCadastradas({ first: 0, rows: this.rowsCount });
    //           },
    //         ));
    //     this.loading.end();
    //   }
    // });
  }
}
