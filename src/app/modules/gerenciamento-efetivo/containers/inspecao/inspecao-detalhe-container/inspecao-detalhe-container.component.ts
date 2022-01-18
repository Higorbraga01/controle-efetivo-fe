import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment, { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { Inspecao } from 'src/app/models/inspecao.model';
import { InspecaoService } from 'src/app/service/inspecao.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'controle-inspecao-detalhe-container',
  templateUrl: './inspecao-detalhe-container.component.html',
  styleUrls: ['./inspecao-detalhe-container.component.scss']
})
export class InspecaoDetalheContainerComponent implements OnInit {
  private subs$: Subscription[] = [];
  public id: number;
  public situacao: any[];
  public hoje: Moment;
  public blocked: boolean;
  public inspecao: Inspecao;

  constructor(
    public loading: LoadingBarService,
              private inspecaoService: InspecaoService,
              private activitedRoute: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.hoje = moment(new Date).startOf('day');
    this.id = this.activitedRoute.snapshot.params['id'];
    this.loading.start();
    this.blocked = true;
      if (this.id) {
        this.inspecaoService.findByID(this.id).subscribe(res => {
          this.inspecao = res
          this.loading.end();
          this.blocked = false;
        }) 
      }
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
