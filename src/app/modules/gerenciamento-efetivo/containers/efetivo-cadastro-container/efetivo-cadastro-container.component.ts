import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { switchMap, filter, toArray } from 'rxjs/operators';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/service/pessoa.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'app-efetivo-cadastro-container',
  templateUrl: './efetivo-cadastro-container.component.html',
  styleUrls: ['./efetivo-cadastro-container.component.scss']
})
export class EfetivoCadastroContainerComponent implements OnInit {
  public area: SelectItem[];
  public cursoList: any[] = [];
  public cursoSelecionados: any[] = [];
  private subs$: Subscription[] = [];
  public form: FormGroup;
  public id: number;
  public situacao: any[];
  public pessoa: Pessoa;


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
      setores: this.fb.control([])
    });

    this.situacao = [
      {name: 'Ativa', code: 'S'},
      {name: 'Reserva', code: 'N'},
  ];

    this.id = this.activitedRoute.snapshot.params['id'];
    if (this.id) {
      this.pessoaService.findByID(this.id).subscribe(res => this.pessoa = res);
    }

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
    this.cursoSelecionados.map(q => q.id)
  }

  onMoveToSource(event: any): void {
    this.buscarCursos({});
  }

  resetForms(): void {
    this.form.reset();
    this.cursoSelecionados = [...this.cursoSelecionados.filter(curso => !this.cursoSelecionados.map(item => null))];
    this.buscarCursos({});
  }

  buscarCursos(event: any): void {
    const ids = this.cursoSelecionados.map(q => q.id);
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
