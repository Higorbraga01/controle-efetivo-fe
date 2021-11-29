import { BaseSearch } from './base-search';
import { BaseModel } from './base.model';

export interface OrganizacaoResponse extends BaseModel {
  nome?: string;
  sigla?: string;
  cdOrg?: string;
}

export interface OrganizacaoSearch extends BaseSearch{
  nome?: string;
  sigla?: string;
}
