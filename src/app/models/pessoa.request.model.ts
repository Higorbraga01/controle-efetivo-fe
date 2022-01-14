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
