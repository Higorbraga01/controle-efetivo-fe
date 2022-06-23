import { Component, OnInit } from '@angular/core';
import { Inspecao } from 'src/app/models/inspecao.model';
import { InspecaoService } from 'src/app/service/inspecao.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public customers: any[]
  public dialogVisible: boolean;
  public siglaUnidadeSelecionada: string;
  public totalEfetivoOm: number;
  public totalInspecoesEfetivoOm: number;
  public inspecoesVencidas: Inspecao[] = [];
  public loadingData: boolean;
  public totalRecords: number;

  constructor(
    private pessoaService: PessoaService,
    private sharedService: SharedDataService,
    private userService: UserService,
    private inspecaoService: InspecaoService
    ) { }

  ngOnInit(): void {
    this.siglaUnidadeSelecionada = this.userService.user.organizacao.sigla;
    this.pessoaService.countEfetivoOm(this.userService.user.organizacao.id).subscribe(totalEfetivo => this.totalEfetivoOm = totalEfetivo);
    this.inspecaoService.countInspecoesEfetivoOm(this.userService.user.organizacao.id).subscribe(totalInspecoes => this.totalInspecoesEfetivoOm = totalInspecoes);
    this.inspecaoService.buscarInspecoesVencidasPorOrganizacao(this.userService.user.organizacao.id).subscribe(inspecoes => this.inspecoesVencidas = inspecoes.content);
    this.sharedService.currentMessage.subscribe(message => {
      this.siglaUnidadeSelecionada = message.sigla;
      this.pessoaService.countEfetivoOm(message.id).subscribe(totalChange => this.totalEfetivoOm = totalChange);
      this.inspecaoService.countInspecoesEfetivoOm(message.id).subscribe(totalInspecoesChange => this.totalInspecoesEfetivoOm = totalInspecoesChange);
      this.inspecaoService.buscarInspecoesVencidasPorOrganizacao(message.id).subscribe(inspecoes => this.inspecoesVencidas = inspecoes.content)
    });
  }

  updateTable(event: any){

  }

  showDialog() {
    this.dialogVisible = true;
}

}
