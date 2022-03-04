import { Pessoa } from "./pessoa.model";

export interface InspecaoRequest {
    id?: number;
    dataRealizacao: string;
    dataValidade: string;
    finalidadeInspecaoId: number;
    julgamentoJuntaSaudeId: number;
    subFinalidadeInspecaoId: number;
    classificacaoInspecaoId: number;
    subClassificacaoInspecaoId: number;
    pessoaId: number;
}
export interface Inspecao {
  id?:                            number;
  agenda?:                        Agenda;
  numeroProntuario?:              null;
  pessoaInspecionada?:            Pessoa;
  dataSolicitacaoInspsau?:        Date;
  numeroOrdemAgendamentoAvulso?:  Pessoa;
  codigoDependente?:              string;
  numeroCpfDependente?:           string;
  tipoJunta?:                     TipoJunta;
  finalidade?:                    Finalidade;
  classificacaoInspsau?:          ClassificacaoInspsau;
  statusInspsau?:                 StatusInspsau;
  dataCancelamento?:              Date;
  numeroOrdemCancelamento?:       Pessoa;
  quantidadePeriodoValidade?:     number;
  situacaoInspecaoVigente?:       string;
  textoMotivo?:                   string;
  textoObservacao?:               string;
  codigoInspesau?:                number;
  numeroOrdemAuxiliarRecepecao?:  Pessoa;
  dataAlteracaoAuxiliarRecepcao?: Date;
  dataAgendamento?:               Date;
  textoParecer?:                  string;
  organizacao?:                   Organizacao;
  dataValidade?:           Date;
}

export interface Agenda {
  id?:                      number;
  organizacaoId?:           string;
  dataAgenda?:              Date;
  situacaoDisponibilidade?: string;
}

export interface StatusInspsau {
  id?: number;
  nome?: string;
  descricao?: string;
}

export interface ClassificacaoInspsau {
  id?:        number;
  nome?:      string;
  descricao?: string;
}

export interface Finalidade {
  id?:        number;
  sigla?:     string;
  descricao?: string;
  situacao?:  string;
  nome?:      string;
}

export interface Organizacao {
  id?:              string;
  comandoId?:       string;
  comandoSigla?:    string;
  statusComando?:   string;
  omSuperiorId?:    string;
  omSuperiorSigla?: string;
  comarId?:         string;
  comarSigla?:      string;
  omBoletimId?:     string;
  omBoletimSigla?:  string;
  nome?:            string;
  sigla?:           string;
  email?:           null;
  pabx?:            string;
  areaPabx?:        string;
  ramalPabx?:       null;
  homePage?:        null;
  extinta?:         string;
  tipoAtividade?:   string;
}

export interface TipoJunta {
  id?:    number;
  sigla?: string;
  nome?:  string;
}
