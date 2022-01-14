import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-efetivo-tabela',
  templateUrl: './efetivo-tabela.component.html',
  styleUrls: ['./efetivo-tabela.component.scss']
})
export class EfetivoTabelaComponent implements OnInit {

@Input() pessoas: Pessoa[];


  totalRecords: number;

  cols: any[];

  loading: boolean;

  representatives: any[];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
      this.representatives = [
          {name: "Amy Elsner", image: 'amyelsner.png'},
          {name: "Anna Fali", image: 'annafali.png'},
          {name: "Asiya Javayant", image: 'asiyajavayant.png'},
          {name: "Bernardo Dominic", image: 'bernardodominic.png'},
          {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
          {name: "Ioni Bowcher", image: 'ionibowcher.png'},
          {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
          {name: "Onyama Limba", image: 'onyamalimba.png'},
          {name: "Stephen Shaw", image: 'stephenshaw.png'},
          {name: "Xuxue Feng", image: 'xuxuefeng.png'}
      ];

      this.loading = true;
  }

  loadCustomers(event: LazyLoadEvent) {
      this.loading = true;

      setTimeout(() => {
          this.pessoaService.getAllSearch({lazyEvent: JSON.stringify(event)}).subscribe(res => {
              this.pessoas = res.content;
              this.totalRecords = res.totalElements;
              this.loading = false;
          })
      }, 100);
  }}
