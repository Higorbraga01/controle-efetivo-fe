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
    id:             number;
    pessoaId:       number;
    tipoInspecao:   TipoInspecao;
    tipoResultado:  tipoResultado;
    dataRealizacao: Date;
    dataValidade:   Date;
}

export enum TipoInspecao {
    D, 
    E,
    H
}

export enum tipoResultado {
    APTO, 
    NAO_APTO, 
    APTO_COM_RESTRICAO
}