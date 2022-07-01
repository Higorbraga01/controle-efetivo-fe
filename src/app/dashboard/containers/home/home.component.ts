import { Component, OnInit } from '@angular/core';
import { of, Subscription, timer } from 'rxjs';
import { share, mapTo, takeUntil, mergeAll } from 'rxjs/operators';
import { Inspecao } from 'src/app/models/inspecao.model';
import { QuadroSinotico } from 'src/app/models/organizacao.model'
import { InspecaoService } from 'src/app/service/inspecao.service';
import { OrganizacaoService } from 'src/app/service/organizacao.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public subs$: Subscription[] = [];
  public customers: any[]
  public dialogVisible: boolean;
  public siglaUnidadeSelecionada: string;
  public totalEfetivoOm: number;
  public totalInspecoesEfetivoOm: number;
  public inspecoesVencidas: Inspecao[] = [];
  public loadingData: boolean;
  public totalRecords: number;
  public rowsCount: number;
  public first: number;
  public orgId: string;
  private sort = {sort: 'pessoaInspecionada.numeroPosto,pessoaInspecionada.numeroAntiguidade'};
  public data: any;
  public dataset: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  public chartOptions: any;
  public labels: string[];
  public datatest: number[];


  constructor(
    private loading: LoadingBarService,
    private pessoaService: PessoaService,
    private sharedService: SharedDataService,
    private userService: UserService,
    private inspecaoService: InspecaoService,
    private organizacaoService: OrganizacaoService
    ) { }

  ngOnInit(): void {
    this.siglaUnidadeSelecionada = this.userService.user.organizacao.sigla;
    this.orgId = this.userService.user.organizacao.id;
    this.pessoaService.countEfetivoOm(this.orgId).subscribe(totalEfetivo => this.totalEfetivoOm = totalEfetivo);
    this.inspecaoService.countInspecoesEfetivoOm(this.orgId).subscribe(totalInspecoes => this.totalInspecoesEfetivoOm = totalInspecoes);
    this.organizacaoService.carregarQuadroSiniticoPorOrganizacao(this.orgId).subscribe(res =>this.gerarChart(res));
    this.sharedService.currentMessage.subscribe(message => {
      if(message.id) {
        this.orgId = message.id;
        this.siglaUnidadeSelecionada = message.sigla;
        this.pessoaService.countEfetivoOm(message.id).subscribe(totalChange => this.totalEfetivoOm = totalChange);
        this.inspecaoService.countInspecoesEfetivoOm(message.id).subscribe(totalInspecoesChange => this.totalInspecoesEfetivoOm = totalInspecoesChange);
        this.organizacaoService.carregarQuadroSiniticoPorOrganizacao(this.orgId).subscribe(res => this.gerarChart(res));
      }
    });
  }

  updateTable(event: any){
    this.rowsCount = event.rows;
    this.first = event.first;
    const page = { page: event.first / event.rows };
    const size = { size: event.rows };
    let searchObject = {};
    if (event.sortField) {
      const sort = {
        sort: `${event.sortField},${event.sortOrder === 1 ? 'ASC' : 'DESC'}`,
      };
      searchObject = Object.assign({},page,size,this.sort);
    } else {
      searchObject = Object.assign({},page,size,this.sort);
    }

    this.loading.start();
    const getInspecoes$ = this.inspecaoService
      .buscarInspecoesVencidasPorOrganizacao(this.orgId,searchObject)
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
          this.inspecoesVencidas = res.content;
          this.totalRecords = res.totalElements;
          this.loading.end();
        }
      )
    );
  }


private gerarChart(res: QuadroSinotico[]) {
  let postos: string[];
  let quantitativos: number[];
  let cores: string[] = [];
  postos = res.map(({ siglaPosto, situacao }) => siglaPosto ? siglaPosto + ' ' + situacao : situacao);
  quantitativos = res.map(({ quantidade }) => quantidade);
  for (let i = 0; i < quantitativos.length; i++) {
    cores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
  }
  this.data = {
    labels: postos,
    datasets: [
      {
        label: 'Quantidade efetivo por posto',
        data: quantitativos,
        backgroundColor: cores,
        hoverBackgroundColor: cores
      }
    ]
  };
}

}
