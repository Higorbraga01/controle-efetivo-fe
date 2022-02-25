import {Organizacao} from './organizacao.model';
import { BaseModel } from './base.model';
import {BaseSearch} from './base-search';
import { Inspecao } from './inspecao.model';
import { Especialidade } from './Especialidade';
import { Posto } from './Posto';
import { Quadro } from './Quadro';
import { Setor } from './Setor';
import { Unidade } from './Unidade';

export interface PessoaSearch extends BaseSearch {
  nrCpf?: string;
  nome?: string;
  siglaPosto?: string;
  siglaQuadro?: string;
  siglaEspecialidade?: string;
  situacao?: string;
  email?: string;
  organizacaoMilitarId?: number;
  contatoPrincipal?: string;
}

export interface PessoaRequest {
  id: number;
  unidadeId: string;
  nomePessoa: string;
  postoId: string;
  nomeGuerra: string;
  inAtivo: string;
  especialidadeId: number;
  codigoSubEspecialidade: number;
  numeroIdentidade: string;
  siglaOrgaoEspedidor: string;
  numeroCpf: string;
  numeroSaram: string;
  codigoSexo: string;
  quadroId: string;
  dataIncorporacao: Date;
  dataBaixa: Date;
  nomeEmail: string;
  numeroTelefone: string;
  dataNascimento: string;
  numeroRegistroCnh: string;
  codigoCategoriaCnh: string;
  dataValidadeCnh: Date;
}


export interface Pessoa {
  id?:                      string;
  numeroMatriculaSiape?:    null;
  cpf?:                     string;
  nome?:                    string;
  siglaSituacao?:           string;
  posto?:                   string;
  numeroPosto?:             string;
  numeroAntiguidade?:       string;
  nomeGuerra?:              string;
  dataPraca?:               Date;
  postoNomeGuerra?:         string;
  quadro?:                  string;
  especialidade?:           string;
  nomeEspecialidade?:       string;
  tarefaTempoCerto?:        string;
  organizacaoId?:           string;
  organizacaoSigla?:        string;
  organizacaoServicoId?:    string;
  organizacaoServicoSigla?: string;
  dataNascimento?:          Date;
  sexo?:                    string;
  raca?:                    string;
  primeiraPromocao?:        string;
  dataPromocaoAtual?:       Date;
  nomePais?:                string;
  nomeCidade?:              string;
  siglaEstado?:             string;
  identidadeMilitar?:       string;
  identidadeCivil?:         string;
  dataEmissaoCivil?:        string;
  nomeOrgaoEmissorCivil?:   string;
  numeroPisPasep?:          string;
  altura?:                  string;
  peso?:                    string;
  tipoSangueRh?:            string;
  inspecoes?:              Inspecao[];
  setores?:                Setor[];
}
