export interface Inspecao {
    id:             number;
    pessoaPostoSiglaPosto: string;
    pessoaEspecialidadeSiglaEspecialidade: string;
    pessoaDataBaixa: Date;
    pessoaNomePessoa: string
    tipoInspecao:   string;
    tipoResultado:  string;
    dataRealizacao: Date;
    dataValidade:   Date;
}

export interface InspecaoRequest {
    id?:             number;
    pessoaId:       number;
    tipoInspecao:   TipoInspecao;
    tipoResultado:  TipoResultado;
    dataRealizacao: Date;
    dataValidade:   Date;
}

export enum TipoInspecao {
    D = 'D', 
    E = 'E',
    H = 'H',
    G = 'G'
}

export enum TipoResultado {
    APTO = 'APTO',
    NAO_APTO = 'NAO_APTO',
    APTO_COM_RESTRICAO = 'APTO_COM_RESTRICAO'
}