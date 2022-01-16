import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { switchMap, filter, toArray } from 'rxjs/operators';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Unidade } from "src/app/models/Unidade";
import { Setor } from "src/app/models/Setor";
import { Quadro } from "src/app/models/Quadro";
import { Posto } from "src/app/models/Posto";
import { Especialidade } from "src/app/models/Especialidade";
import { PessoaRequest } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/service/pessoa.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'app-efetivo-cadastro-container',
  templateUrl: './efetivo-cadastro-container.component.html',
  styleUrls: ['./efetivo-cadastro-container.component.scss']
})
export class EfetivoCadastroContainerComponent implements OnInit {
  private subs$: Subscription[] = [];
  public form: FormGroup;
  public pessoa: Pessoa;
  public setores: Setor[];
  public postos: Posto[];
  public quadros: Quadro[];
  public especialidades: Especialidade[];
  public unidades: Unidade[];
  public cdsexo: any[];


  constructor(
    private loading: LoadingBarService,
              private fb: FormBuilder,
              private service: PessoaService,
              private messageService: MessageService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.form);
    this.cdsexo = [
      {
        id: 1,
        codigo: "M",
        nome: "Masculino"
      },
      {
        id: 2,
        codigo: "F",
        nome: "Feminino"
      }
    ]
    this.postos = [      
      { 
        id:          "BR",
        nomePosto:   "Brigadeiro",
        numeroOrdem: "1",
        siglaPosto:  "Brig",
      },
      { 
        id:          "CL",
        nomePosto:   "Coronel",
        numeroOrdem: "2",
        siglaPosto:  "Cel",
      }];
    this.quadros = [
      {
        id: "13",
        codigoPosto: "19",
        siglaQuadro: "QSS",
        nomeQuadro: "DE SUBOFICIAIS E SARGENTOS",
        numeroQuadro: 60,
        siglaQuadroEspecialidade: null
      },
      {
        id: "16",
        codigoPosto: "26",
        siglaQuadro: "QSD",
        nomeQuadro: "DE SOLDADOS",
        numeroQuadro: 74,
        siglaQuadroEspecialidade: null
      }
    ];
    this.especialidades = [
      {
        id: 8,
        siglaEspecialidade: "QSS-BMA",
        siglaAbreviada: null,
        descricaoEspecilidade: "MECANICA DE AERONAVES"
      },
      {
        id: 31,
        siglaEspecialidade: "QOINT",
        siglaAbreviada: 'Int',
        descricaoEspecilidade: "QUADRO DE OFICIAIS"
      }
    ];
    this.unidades = [
      {
        id: "299",
        siglaUnidade: "CCA RJ",
        siglaUnidadeCompleta: "CCA RJ",
        nomeUnidade: "CENTRO DE COMPUTACAO DA AERONAUTICA DO RJ",
        nomeUnidadeCompleto: "CENTRO DE COMPUTACAO DA AERONAUTICA DO RJ",
        endereco: "PONTA DO GALEÃO S/Nº",
        cep: "21941520"
      }
    ]

  }

  buildForm(): void {
    this.form = this.fb.group({
      nomePessoa: this.fb.control(null, [Validators.required]),
      nomeGuerra: this.fb.control(null, [Validators.required]),
      postoId: this.fb.control(null,[Validators.required]),
      especialidadeId: this.fb.control(null,[Validators.required]),
      codigoSubEspecialidade: this.fb.control(null),
      numeroIdentidade: this.fb.control(null),
      siglaOrgaoEspedidor: this.fb.control(null),
      numeroCpf: this.fb.control(null,[Validators.required, Validators.pattern((/^[0-9]+$/)), Validators.minLength(11)]),
      numeroSaram: this.fb.control(null, [Validators.required, Validators.pattern((/^[0-9]+$/)), Validators.minLength(7)]),
      codigoSexo: this.fb.control(null,[Validators.required]),
      quadroId: this.fb.control(null,[Validators.required]),
      dataIncorporacao: this.fb.control(null,[Validators.required]),
      dataBaixa: this.fb.control(null),
      nomeEmail: this.fb.control(null, [Validators.email]),
      numeroTelefone: this.fb.control(null),
      dataNascimento: this.fb.control(null,[Validators.required]),
      numeroRegistroCnh: this.fb.control(null),
      codigoCategoriaCnh: this.fb.control(null),
      dataValidadeCnh: this.fb.control(null),
      unidadeId: this.fb.control(null),
    });
  }

  searchArea(event: any): void {
    // this.subs$.push(
    //   this.facade.findAllArea({sigla: event.query})
    //     .subscribe(response => {
    //       this.area = response.content.map(area => ({
    //         label: area.nome,
    //         title: area.sigla,
    //         value: area
    //       }));
    //     })
    // );
  }

  resetForms(): void {
    this.form.reset();
  }

  saveArea(): void {
    const pessoaRequest: PessoaRequest = this.form.value;
    this.loading.start();
    this.service.save(pessoaRequest)
      .subscribe(result => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pessoa cadastrada com sucesso',
          life: 3000
        });
        this.loading.end();
        this.router.navigate(['gerenciamento']);
      });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
