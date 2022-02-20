import { Pessoa } from "./pessoa.model";

export interface Inspecao {
    id?:                       number;
    pessoa?:                   Pessoa;
    julgamentoJuntaSaude?:     JulgamentoJuntaSaude;
    finalidadeInspecao?:       FinalidadeInspecao;
    subFinalidadeInspecao?:    SubFinalidadeInspecao;
    classificacaoInspecao?:    ClassificacaoInspecao;
    subClassificacaoInspecao?: SubClassificacaoInspecao;
    dataRealizacao?:           Date;
    dataValidade?:             Date;
}

export interface InspecaoRequest {
    id?: number;
    dataRealizacao: string;
    dataValidade: string;
    finalidadeInspecaoId: number;
    julgamentoJuntaSaudeId: number;
    subFinalidadeInspecaoId: number;
    classificacaoInspecaoId: number;
    subClassificacaoInspecaoId: number;
    pessoaId: number;
}

export interface JulgamentoJuntaSaude {
    id?:        number;
    codigo?:    string;
    descricao?: string;
}

export interface FinalidadeInspecao {
    id?:        number;
    codigo?:    string;
    descricao?: string;
}

export interface SubFinalidadeInspecao {
    id?:        number;
    codigo?:    string;
    descricao?: string;
}

export interface ClassificacaoInspecao {
    id?:        number;
    codigo?:    string;
    descricao?: string;
}
export interface SubClassificacaoInspecao {
    id?:        number;
    codigo?:    string;
    descricao?: string;
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