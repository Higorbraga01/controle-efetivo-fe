import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  InspecaoRequest,
  TipoInspecao,
  TipoResultado,
} from 'src/app/models/inspecao.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Posto } from 'src/app/models/Posto';
import { InspecaoService } from 'src/app/service/inspecao.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';

@Component({
  selector: 'controle-inspecao-cadastro-container',
  templateUrl: './inspecao-cadastro-container.component.html',
  styleUrls: ['./inspecao-cadastro-container.component.scss'],
})
export class InspecaoCadastroContainerComponent implements OnInit {
  private subs$: Subscription[] = [];
  public form: FormGroup;
  public inspecao: InspecaoRequest;
  public pessoas: Pessoa[];
  public tipoInspecao: any[];
  public tiposResultados: any[];
  private unidadeId: string;

  constructor(
    private loading: LoadingBarService,
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private inspecaoService: InspecaoService,
    private messageService: MessageService,
    public userService: UserService,
    private sharedService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.sharedService.currentMessage.subscribe(() =>{
      if (JSON.parse(sessionStorage.getItem('unidade'))) {
        this.unidadeId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
      } else {
        this.unidadeId = this.userService?.user?.organizacao !=null ? this.userService?.user?.organizacao?.id.toString(): '0000';
      }
      this.pessoaService
      .getAllSearch({unidadeId: this.unidadeId})
      .subscribe((res) => (this.pessoas = res.content));
    });    
    this.tiposResultados = [
      {
        tipo: TipoResultado.APTO,
      },
      {
        tipo: TipoResultado.NAO_APTO,
      },
      {
        tipo: TipoResultado.APTO_COM_RESTRICAO,
      },
    ];
    this.tipoInspecao = [
      {
        letra: TipoInspecao.D,
      },
      {
        letra: TipoInspecao.E,
      },
      {
        letra: TipoInspecao.H,
      },
      {
        letra: TipoInspecao.G,
      },
    ];
  }

  buildForm(): void {
    this.form = this.fb.group({
      dataRealizacao: this.fb.control(null, [Validators.required]),
      dataValidade: this.fb.control(null, [Validators.required]),
      pessoaId: this.fb.control(null, [Validators.required]),
      tipoInspecao: this.fb.control(null, [Validators.required]),
      tipoResultado: this.fb.control(null, [Validators.required]),
    });
  }

  resetForms(): void {
    this.form.reset();
  }

  save(): void {
    const inspecaoRequest: InspecaoRequest = {
      dataRealizacao: this.form.get('dataRealizacao').value,
      dataValidade: this.form.get('dataValidade').value,
      pessoaId: this.form.get('pessoaId').value.value,
      tipoInspecao: this.form.get('tipoInspecao').value,
      tipoResultado: this.form.get('tipoResultado').value,
    };
    
    this.loading.start();
    this.inspecaoService.save(inspecaoRequest).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Pessoa cadastrada com sucesso',
        life: 3000,
      });
      this.loading.end();
      this.router.navigate(['inspecao']);
    });
  }

  searchPessoas(event: any): void {
    this.subs$.push(
      this.pessoaService.getAllSearch({unidadeId: this.unidadeId ,nomePessoa: event.query })
        .subscribe((response: { content: any }) => {
          this.pessoas = response.content.map((pessoas: {id: number ,nomePessoa: string, nomeGuerra: string, posto: Posto}) => ({
            label: pessoas.nomePessoa,
            title: pessoas.posto.siglaPosto + " "+  pessoas.nomeGuerra,
            value: pessoas.id
          }));
        })
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
