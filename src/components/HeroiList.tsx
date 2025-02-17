import React, { useContext } from 'react';
import { GameContext } from '../context/Context';
import { Heroi } from '../types/types';

interface HeroiListProps {
  onEdit: (heroi: Heroi) => void;
}

export const HeroiList: React.FC<HeroiListProps> = ({ onEdit }) => {
  const { state } = useContext(GameContext);

  return (
    <div>
      <h2>Heróis</h2>
      <ul>
        {state.herois.map((heroi, index) => (
          <li style={{ margin:"1rem 1rem 1rem 1rem"}} key={index}>{heroi.nome} - {heroi.classe} <button onClick={() => onEdit(heroi)} >editar</button></li>
        ))}
      </ul>
    </div>
  );
};