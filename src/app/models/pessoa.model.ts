import {OrganizacaoResponse} from './organizacao.model';
import { BaseModel } from './base.model';
import {BaseSearch} from './base-search';

export interface Pessoa extends BaseModel {
  nome?: string;
  nrCpf?: string;
  nrOrdem?: string;
  siglaPosto?: string;
  siglaQuadro?: string;
  siglaEspecialidade?: string;
  organizacao?: OrganizacaoResponse;
}

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
