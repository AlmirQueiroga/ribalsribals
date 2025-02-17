// src/types.ts
export interface Mapa {
    nome: string;
    posicao?: string[];
    submapa?: string[];
    tipo: string;
  }
  
  export interface Heroi {
    nome: string;
    classe: Classe;
    counters?: Heroi[];
    countered?: Heroi[];
    goodMaps?: GameStatusPlus[];
    badMaps?: GameStatusDown[];
  }

  export enum Classe {
    Tank = 'Tank',
    DPS = 'DPS',
    Support = 'Support',
  }

  export interface GameStatusPlus {
    tipo: string;
    mapa: Mapa;
    submapa?: string;
    posicao?: string;
    aliadoPlus?: Heroi[];
    aliadoOb?: Heroi[];
    specifCounter?: Heroi[];
  }
  
  export interface GameStatusDown {
    tipo: string;
    mapa: Mapa;
    submapa?: string;
    posicao?: string;
    aliadoDown?: Heroi[];
    aliadoObDown?: Heroi[];
    specifCountered?: Heroi[];
  }
  
  export interface CompList {
    herois: Heroi[];
    tipo: string;
    mapa: Mapa;
    posicao?: string;
    submapa?: string;
    formacao?: string;
    sinergia: number;
    eficacia: number;
  }
  
  export interface AppContextType {
    herois: Heroi[];
    mapas: Mapa[];
    tipoJogo: string[];
    formacao: string[];
  }