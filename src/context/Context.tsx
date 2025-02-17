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
  editHeroi: (heroi: Heroi) => void;
  addMapa: (mapa: Mapa) => void;
  addTipoJogo: (tipo: string) => void;
  addFormacao: (formacao: string) => void;
  saveToJson: () => void;
  loadFromJson: () => void;
}>({
  state: defaultState,
  addHeroi: () => {},
  editHeroi: () => {},
  addMapa: () => {},
  addTipoJogo: () => {},
  addFormacao: () => {},
  saveToJson: () => {},
  loadFromJson: () => {},
});


export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextType>(defaultState);

  const addHeroi = (heroi: Heroi) => {
    setState((prevState) => ({
      ...prevState,
      herois: [...prevState.herois, heroi],
    }));
  };

  const editHeroi = (updatedHeroi: Heroi) => {
    setState((prevState) => ({
      ...prevState,
      herois: prevState.herois.map((heroi) =>
        heroi.nome === updatedHeroi.nome ? updatedHeroi : heroi
      ),
    }));
  };

  const addMapa = (mapa: Mapa) => {
    setState((prevState) => ({
      ...prevState,
      mapas: [...prevState.mapas, mapa],
    }));
  };

  const addTipoJogo = (tipo: string) => {
    setState((prevState) => ({
      ...prevState,
      tipoJogo: [...prevState.tipoJogo, tipo],
    }));
  };

  const addFormacao = (formacao: string) => {
    setState((prevState) => ({
      ...prevState,
      formacao: [...prevState.formacao, formacao],
    }));
  };

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
        editHeroi,
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