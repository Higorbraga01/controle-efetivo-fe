import {OrganizacaoResponse} from './organizacao.model';
import { BaseModel } from './base.model';
import {BaseSearch} from './base-search';
import { Inspecao } from './inspecao.model';

// export interface Pessoa extends BaseModel {
//   nome?: string;
//   nrCpf?: string;
//   nrOrdem?: string;
//   siglaPosto?: string;
//   siglaQuadro?: string;
//   siglaEspecialidade?: string;
//   organizacao?: OrganizacaoResponse;
// }

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

export interface Pessoa {
  id?:                     number;
  unidade?:                Unidade;
  nomePessoa?:             string;
  posto?:                  Posto;
  nomeGuerra?:             string;
  inAtivo?:                string;
  especialidade?:          Especialidade;
  codigoSubEspecialidade?: number;
  numeroIdentidade?:       string;
  siglaOrgaoEspedidor?:    string;
  numeroCpf?:              string;
  numeroSaram?:            string;
  codigoSexo?:             string;
  quadro?:                 Quadro;
  dataIncorporacao?:       Date;
  dataBaixa?:              Date;
  nomeEmail?:              string;
  numeroTelefone?:         null;
  dataNascimento?:         Date;
  numeroRegistroCnh?:      null;
  codigoCategoriaCnh?:     null;
  dataValidadeCnh?:        null;
  inspecoes?:              Inspecao[];
  setores?:                Setor[];
}

export interface Especialidade {
  id?:                    number;
  siglaEspecialidade?:    string;
  siglaAbreviada?:        null;
  descricaoEspecilidade?: string;
}

export interface Posto {
  id?:          string;
  nomePosto?:   string;
  numeroOrdem?: string;
  siglaPosto?:  string;
}

export interface Quadro {
  id?:                       string;
  codigoPosto?:              string;
  siglaQuadro?:              string;
  nomeQuadro?:               string;
  numeroQuadro?:             number;
  siglaQuadroEspecialidade?: null;
}

export interface Setor {
  setorId?:           SetorID;
  siglaSetor?:        string;
  tipoSetor?:         string;
  nomeSetor?:         string;
  inAtivo?:           string;
  tipoDivisao?:       string;
  codigoSetorSigpes?: string;
}

export interface SetorID {
  codigoSetor?: string;
  codigoUnidade?: string;
}

export interface Unidade {
  id?:                   string;
  siglaUnidade?:         string;
  siglaUnidadeCompleta?: string;
  nomeUnidade?:          string;
  nomeUnidadeCompleto?:  string;
  endereço?:             string;
  cep?:                  string;
}

