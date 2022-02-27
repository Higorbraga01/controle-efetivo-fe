import { SharedDataService } from 'src/app/service/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment, { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Setor } from "src/app/models/Setor";
import { PessoaService } from 'src/app/service/pessoa.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'controle-efetivo-detalhe-container',
  templateUrl: './efetivo-detalhe-container.component.html',
  styleUrls: ['./efetivo-detalhe-container.component.scss']
})
export class EfetivoDetalheContainerComponent implements OnInit {
  private subs$: Subscription[] = [];
  public id: number;
  public situacao: any[];
  public pessoa: Pessoa;
  public setores: Setor[];
  public hoje: Moment;
  public blocked: boolean;

  constructor(
    public loading: LoadingBarService,
              private pessoaService: PessoaService,
              private sharedDataService: SharedDataService,
              private router: Router,
              private activitedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.hoje = moment(new Date).startOf('day');
    this.id = this.activitedRoute.snapshot.params['id'];
    this.loading.start();
    this.blocked = true;
      if (this.id) {
        this.pessoaService.findByID(this.id).subscribe(pessoa => {
          this.pessoa = pessoa;
          this.sharedDataService.currentMessage.subscribe(unidadeChange => {
            if(unidadeChange instanceof Array ){
              return;
            } else
            if(unidadeChange.id != pessoa.organizacaoId){
              this.router.navigate(['/efetivo'])
            }      
          });
        });
    }
    this.loading.end();
    this.blocked = false;   
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
