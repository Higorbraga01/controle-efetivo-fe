import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs'
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

  resetForms(): void {
    this.form.reset();
  }

  save(): void {
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
        this.router.navigate(['efetivo']);
      });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
