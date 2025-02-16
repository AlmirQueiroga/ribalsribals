import React, { createContext, useState, ReactNode } from 'react';
import { AppContextType, Heroi, Mapa } from '../types/types';

// Estado inicial
const defaultState: AppContextType = {
  herois: [],
  mapas: [],
  tipoJogo: [],
  formacao: [],
};

// Criar o contexto
export const GameContext = createContext<{
  state: AppContextType;
  addHeroi: (heroi: Heroi) => void;
  addMapa: (mapa: Mapa) => void;
  addTipoJogo: (tipo: string) => void;
  addFormacao: (formacao: string) => void;
  saveToJson: () => void;
  loadFromJson: () => void;
}>({
  state: defaultState,
  addHeroi: () => {},
  addMapa: () => {},
  addTipoJogo: () => {},
  addFormacao: () => {},
  saveToJson: () => {},
  loadFromJson: () => {},
});

// Provider do contexto
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextType>(defaultState);

  // Função para adicionar um herói
  const addHeroi = (heroi: Heroi) => {
    setState((prevState) => ({
      ...prevState,
      herois: [...prevState.herois, heroi],
    }));
  };

  // Função para adicionar um mapa
  const addMapa = (mapa: Mapa) => {
    setState((prevState) => ({
      ...prevState,
      mapas: [...prevState.mapas, mapa],
    }));
  };

  // Função para adicionar um tipo de jogo
  const addTipoJogo = (tipo: string) => {
    setState((prevState) => ({
      ...prevState,
      tipoJogo: [...prevState.tipoJogo, tipo],
    }));
  };

  // Função para adicionar uma formação
  const addFormacao = (formacao: string) => {
    setState((prevState) => ({
      ...prevState,
      formacao: [...prevState.formacao, formacao],
    }));
  };

  // Função para salvar o estado em um arquivo JSON
  const saveToJson = () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'game-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Função para carregar o estado de um arquivo JSON
  const loadFromJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const loadedState = JSON.parse(content) as AppContextType;
          setState(loadedState);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <GameContext.Provider
      value={{
        state,
        addHeroi,
        addMapa,
        addTipoJogo,
        addFormacao,
        saveToJson,
        loadFromJson,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};