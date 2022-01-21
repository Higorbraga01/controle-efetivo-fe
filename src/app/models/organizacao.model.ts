import { BaseSearch } from './base-search';
import { BaseModel } from './base.model';

export interface OrganizacaoResponse extends BaseModel {
  nomeUnidade?: string;
  siglaUnidade?: string;
}

export interface OrganizacaoSearch extends BaseSearch{
  nome?: string;
  sigla?: string;
}
