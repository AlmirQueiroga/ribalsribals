import React, { useContext } from 'react';
import { GameContext } from '../context/Context';

export const HeroiList: React.FC = () => {
  const { state } = useContext(GameContext);

  return (
    <div>
      <h2>Heróis</h2>
      <ul>
        {state.herois.map((heroi, index) => (
          <li key={index}>{heroi.nome} - {heroi.classe}</li>
        ))}
      </ul>
    </div>
  );
};