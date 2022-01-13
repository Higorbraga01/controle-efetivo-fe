import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { switchMap, filter, toArray } from 'rxjs/operators';
import { Especialidade, Pessoa, Posto, Quadro, Setor, Unidade } from 'src/app/models/pessoa.model';
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


  constructor(
    private loading: LoadingBarService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder, 
              private pessoaService: PessoaService,
              private activitedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buscarCursos({});
    this.buildForm();
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
        endereço: "PONTA DO GALEÃO S/Nº",
        cep: "21941520"
      }
    ]

  }

  buildForm(): void {
    this.form = this.fb.group({
      nomePessoa: this.fb.control(null, [Validators.required]),
      nomeGuerra: this.fb.control(null, [Validators.required]),
      posto: this.fb.control(null),
      especialidade: this.fb.control(null),
      numeroIdentidade: this.fb.control(null),
      siglaOrgaoEspedidor: this.fb.control(null),
      numeroCpf: this.fb.control(null),
      numeroSaram: this.fb.control(null),
      codigoSexo: this.fb.control(null),
      quadro: this.fb.control(null),
      dataIncorporacao: this.fb.control(null),
      dataBaixa: this.fb.control(null),
      nomeEmail: this.fb.control(null),
      numeroTelefone: this.fb.control(null),
      dataNascimento: this.fb.control(null),
      numeroRegistroCnh: this.fb.control(null),
      codigoCategoriaCnh: this.fb.control(null),
      dataValidadeCnh: this.fb.control(null),
      inspecoes: this.fb.control([]),
      setores: this.fb.control([]),
      unidade: this.fb.control(null),
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

  onMoveToTarget(event: any): void {
 
  }

  onMoveToSource(event: any): void {
    this.buscarCursos({});
  }

  resetForms(): void {
    this.form.reset();
  }

  buscarCursos(event: any): void {
    // this.facade.findAllCurso({filtroNomeOuCodigo: event.query})
    //   .pipe(
    //     switchMap(response => this.cursoList = response.content),
    //     filter(result => !ids.includes(result.id)),
    //     toArray()
    //   ).subscribe(result => this.cursoList = result);
  }

  saveArea(): void {
    console.log(this.form.value);
    // const data: AreaRequest = {
    //   nome,
    //   sigla,
    //   idAreaPai: area?.value?.id,
    //   cursos: this.cursoSelecionados.map(cursos => {
    //     return {idCurso: cursos.id};
    //   })
    // };
    // if (!this.id) {
    //   const salvarArea$ = this.facade.save(data);
    //   this.subs$.push(salvarArea$);
    //   salvarArea$.subscribe(() => {
    //     this.loading.start();
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Sucesso',
    //       detail: 'Área criada com sucesso',
    //       life: 3000
    //     });
    //     this.router.navigate(['area']);
    //     this.loading.end();
    //   });
    // } else {
    //   const editArea$ = this.facade.editArea(this.id, data);
    //   this.loading.start();
    //   this.subs$.push(
    //     editArea$.subscribe(() => {
    //       this.loading.start();
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Sucesso',
    //         detail: 'Área editada com sucesso',
    //         life: 3000
    //       });
    //       this.router.navigate(['area']);
    //       this.loading.end();
    //     }));
    //   this.loading.end();
    // }
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
