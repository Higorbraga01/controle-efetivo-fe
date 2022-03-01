import {
  ClassificacaoInspecao,
  SubClassificacaoInspecao,
  FinalidadeInspecao,
  SubFinalidadeInspecao,
  JulgamentoJuntaSaude,
} from './../../../../../models/inspecao.model';
import { JulgamentoInspecaoService } from './../../../../../service/julgamento-inspecao.service';
import { SubFinalidadeService } from './../../../../../service/sub-finalidade.service';
import { FinalidadeService } from './../../../../../service/finalidade.service';
import { SubClassificacaoService } from './../../../../../service/sub-classificacao.service';
import { ClassificacacaoService } from './../../../../../service/classificacacao.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InspecaoRequest } from 'src/app/models/inspecao.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Posto } from 'src/app/models/Posto';
import { InspecaoService } from 'src/app/service/inspecao.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';
import moment, { Moment } from 'moment';

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
  public classificacoes: ClassificacaoInspecao[];
  public subClassificacoes: SubClassificacaoInspecao[];
  public finalidadesInspecao: FinalidadeInspecao[];
  public subFinalidadesInspecao: SubFinalidadeInspecao[];
  public julgamentosInspecao: JulgamentoJuntaSaude[];
  public tipoInspecao: any[];
  public tiposResultados: any[];
  public dataValidade: Moment;
  public dataRealizacao: Moment;
  private unidadeId: string;

  constructor(
    private loading: LoadingBarService,
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private inspecaoService: InspecaoService,
    private classificacaoService: ClassificacacaoService,
    private subClassificacaoService: SubClassificacaoService,
    private finalidadeService: FinalidadeService,
    private subFinalidadeService: SubFinalidadeService,
    private julgamentoInspecaoService: JulgamentoInspecaoService,
    private messageService: MessageService,
    public userService: UserService,
    private sharedService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.sharedService.currentMessage.subscribe(() => {
      if (JSON.parse(sessionStorage.getItem('unidade'))) {
        this.unidadeId = JSON.parse(sessionStorage.getItem('unidade'))?.id;
      } else {
        this.unidadeId =
          this.userService?.user?.organizacao != null
            ? this.userService?.user?.organizacao?.id
            : '0000';
      }
      this.resetForms();
      this.pessoaService
        .getAllSearch({ unidadeId: this.unidadeId })
        .subscribe((res) => (this.pessoas = res.content));
      this.classificacaoService
        .buscarClassificacoes()
        .subscribe((res) => (this.classificacoes = res));
      this.finalidadeService
        .buscarFinalidades()
        .subscribe((res) => (this.finalidadesInspecao = res.content));
      this.julgamentoInspecaoService
        .buscarJulgamentosInspecao()
        .subscribe((res) => (this.julgamentosInspecao = res));
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      dataRealizacao: this.fb.control(null, [Validators.required]),
      dataValidade: this.fb.control(null, [Validators.required]),
      pessoaId: this.fb.control(null, [Validators.required]),
      finalidadeInspecaoId: this.fb.control(null, [Validators.required]),
      subFinalidadeInspecaoId: this.fb.control(
        { value: null, disabled: true },
        Validators.required
      ),
      julgamentoJuntaSaudeId: this.fb.control(null, [Validators.required]),
      classificacaoInspecaoId: this.fb.control(null, Validators.required),
      subClassificacaoInspecaoId: this.fb.control(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  onSelectClassificacao(event: any) {
    if (event.value) {
      this.subClassificacaoService
        .buscarSubClassificacoesPorClassificacao(event.value)
        .subscribe((res) => {
          this.subClassificacoes = res;
          if (res.length > 0) {
            this.form.get('subClassificacaoInspecaoId').enable();
          } else {
            this.form.get('subClassificacaoInspecaoId').disable();
          }
        });
    } else {
      this.form.get('subClassificacaoInspecaoId').disable();
      this.form.get('subClassificacaoInspecaoId').reset();
    }
  }

  onSelectFinalidade(event: any) {
    if (event.value) {
      this.subFinalidadeService
        .buscarSubFinalidadesPorFinalidade(event.value)
        .subscribe((res) => {
          this.subFinalidadesInspecao = res;
          if (res.length > 0) {
            this.form.get('subFinalidadeInspecaoId').enable();
          } else {
            this.form.get('subFinalidadeInspecaoId').disable();
          }
        });
    } else {
      this.form.get('subFinalidadeInspecaoId').disable();
      this.form.get('subFinalidadeInspecaoId').reset();
    }
  }
  resetForms(): void {
    this.form.reset();
  }

  save(): void {
    const inspecaoRequest: InspecaoRequest = {
      dataRealizacao: this.form.get('dataRealizacao').value,
      dataValidade: this.form.get('dataValidade').value,
      pessoaId: this.form.get('pessoaId').value.value,
      finalidadeInspecaoId: this.form.get('finalidadeInspecaoId').value,
      subFinalidadeInspecaoId: this.form.get('subFinalidadeInspecaoId').value,
      julgamentoJuntaSaudeId: this.form.get('julgamentoJuntaSaudeId').value,
      classificacaoInspecaoId: this.form.get('classificacaoInspecaoId').value,
      subClassificacaoInspecaoId: this.form.get('subClassificacaoInspecaoId')
        .value,
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
      this.pessoaService
        .getAllSearch({ unidadeId: this.unidadeId, nomePessoa: event.query })
        .subscribe((response: { content: any }) => {
          this.pessoas = response.content.map(
            (pessoas: {
              id: number;
              nome: string;
              nomeGuerra: string;
              posto: Posto;
            }) => ({
              label: pessoas.nome,
              title: pessoas.posto
                ? pessoas.posto
                : 'CV' + ' ' + pessoas.nomeGuerra,
              value: pessoas.id,
            })
          );
        })
    );
  }

  onSelectDataRealizacao(event: any) {
    this.dataRealizacao = moment(event);
    if (this.dataRealizacao && this.dataValidade) {
      if (this.dataRealizacao.isSameOrBefore(this.dataValidade)) {
        this.form.get('dataValidade').setErrors(null);
      }
        if (this.dataValidade.isBefore(this.dataRealizacao)) {
          this.form
            .get('dataValidade')
            .setErrors({ dataIncorreta: this.dataValidade });
        }
    }
  }

  onSelectDataValidade(event: any): any {
    this.dataValidade = moment(event);
    if (this.dataValidade) {
      if (this.dataValidade.isBefore(this.dataRealizacao)) {
        this.form
          .get('dataValidade')
          .setErrors({ dataIncorreta: this.dataValidade });
      }
    }
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
