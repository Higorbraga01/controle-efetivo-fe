import { BaseSearch } from './base-search';
import { BaseModel } from './base.model';

export interface Organizacao extends BaseModel {
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

export interface OrganizacaoSearch extends BaseSearch{
  nome?: string;
  sigla?: string;
}

export interface QuadroSinotico {
  siglaPosto?: string;
  situacao?: string;
  quantidade?: number;
}
