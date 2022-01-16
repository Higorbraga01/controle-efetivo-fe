import {OrganizacaoResponse} from './organizacao.model';
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
