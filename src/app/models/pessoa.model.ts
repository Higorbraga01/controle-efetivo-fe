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
  id:                    number;
  numeroAntiguidade:     number;
  nomePessoa:            string;
  nomeGuerra:            string;
  graduacao:             string;
  quadro:                string;
  statusReserva:         string;
  especialidade:         string;
  dataApresentacao:      Date;
  dataPraca:             Date;
  dataUltPromo:          Date;
  dataNascimento:        Date;
  numeroIdentidade:      string;
  numeroCpf:             string;
  numeroSaram:           string;
  cargoSetor:            string;
  nomeSetor:             string;
  nomeDivisao:           string;
  nomeEndereco:          string;
  numeroTelefone:        string;
  numeroTitulo:          string;
  numeroTituloZona:      string;
  numeroTituloSecao:     string;
  numeroTituloEstado:    string;
  numeroTituloMunicipio: string;
  honrasMilitares:       string;
  inAtivo:               string;
  escolaridade:          string;
  religiao:              string;
  tpRh:                  string;
  tpCor:                 string;
  tpOlhos:               string;
  tpCabelo:              string;
  numeroCamisa:          number;
  numeroCintura:         number;
  numeroCalcado:         number;
  numeroCobertura:       number;
  numeroLuva:            number;
  inspecoes:             Inspecao[];
}

