// src/types.ts
export interface Mapa {
    nome: string;
    posicao?: string[];
    submapa?: string[];
    tipo: string;
  }
  
  export interface Heroi {
    id: string;
    name: string;
    imageUrl?: string;
    role: Classe;
    attack_type?: string;
    team?: string[];
    difficulty?: number;
    playersGrade?: number[];
    counters?: Heroi[];
    countered?: Heroi[];
  }

  export enum Classe {
    Vanguard = 'Vanguard',
    Duelist = 'Duelist',
    Strategist = 'Strategist',
  }

  export interface GameStatusPlus {
    tipo: string;
    mapa: Mapa;
    submapa?: string;
    posicao?: string;
    aliados: Heroi[];
    inimigos?: Heroi[];
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