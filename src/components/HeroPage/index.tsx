import React, { useState, useContext, useEffect, useRef } from 'react';
import { GameContext } from '../../context/Context';
import { Heroi, Classe, GameStatusPlus, GameStatusDown, Mapa } from '../../types/types';
import { SelectContainer, SelectButton, OptionsList, OptionItem, SelectedItemsContainer, SelectedItem, RemoveButton, SelectMulti, FilterInput, AddButton, GameStatusTable } from './style';

interface AddHeroiFormProps {
  heroiToEdit?: Heroi;
  setHeroEdit?: React.Dispatch<React.SetStateAction<Heroi | undefined>>
}

export const AddHeroiForm: React.FC<AddHeroiFormProps> = ({ heroiToEdit, setHeroEdit }) => {
  const { state, addHeroi, editHeroi } = useContext(GameContext);
  const [isEditing, setIsEditing] = useState(!!heroiToEdit);
  const [editingGoodMap, setEditingGoodMap] = useState<number | undefined>(undefined);
  const [editingBadMap, setEditingBadMap] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState<Classe>(Classe.Tank);
  const [counters, setCounters] = useState<Heroi[]>([]);
  const [countered, setCountered] = useState<Heroi[]>([]);
  const [counterFilter, setCounterFilter] = useState('');
  const [counteredFilter, setCounteredFilter] = useState('');
  const [goodMaps, setGoodMaps] = useState<GameStatusPlus[]>([]);
  const [tipoGoods, setTipoGoods] = useState<string>();
  const [mapaGoods, setMapaGoods] = useState<Mapa>();
  const [subGoods, setSubGoods] = useState<string>('');
  const [posGoods, setPosGoods] = useState<string>('');
  const [aliadoPGoods, setAliadoPGoods] = useState<Heroi[]>([]);
  const [aliadoPGoodsFilter, setAliadoPGoodsFilter] = useState<string>('');
  const [aliadoOGoods, setAliadoOGoods] = useState<Heroi[]>([]);
  const [aliadoOGoodsFilter, setAliadoOGoodsFilter] = useState<string>('');
  const [counterGoods, setCounterGoods] = useState<Heroi[]>([]);
  const [counterGoodsFilter, setCounterGoodsFilter] = useState<string>('');
  const [badMaps, setBadMaps] = useState<GameStatusDown[]>([]);
  const [tipoBad, setTipoBad] = useState<string>();
  const [mapaBad, setMapaBad] = useState<Mapa>();
  const [subBad, setSubBad] = useState<string>('');
  const [posBad, setPosBad] = useState<string>('');
  const [aliadoPBad, setAliadoPBad] = useState<Heroi[]>([]);
  const [aliadoPBadFilter, setAliadoPBadFilter] = useState<string>('');
  const [aliadoOBad, setAliadoOBad] = useState<Heroi[]>([]);
  const [aliadoOBadFilter, setAliadoOBadFilter] = useState<string>('');
  const [counteredBad, setCounteredBad] = useState<Heroi[]>([]);
  const [counteredBadFilter, setCounteredBadFilter] = useState<string>('');

  useEffect(() => {
    if (heroiToEdit) {
      setNome(heroiToEdit.nome);
      setClasse(heroiToEdit.classe);
      setCounters(heroiToEdit.counters || []);
      setCountered(heroiToEdit.countered || []);
      setGoodMaps(heroiToEdit.goodMaps || []);
      setBadMaps(heroiToEdit.badMaps || []);
      setIsEditing(true);

      if(ref.current) ref.current.focus();
    }
  }, [heroiToEdit]);

  const ref = useRef<HTMLInputElement>(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHeroi: Heroi = {
      nome,
      classe,
      ...(counters && { counters: counters }),
      ...(countered && { countered: countered }),
      ...(goodMaps && { goodMaps: goodMaps }),
      ...(badMaps && { badMaps: badMaps }),
      // counters: counters.length > 0 ? counters : undefined,
      // countera: countera.length > 0 ? countera : undefined,
    };

    if(isEditing){
      editHeroi(newHeroi);
    } else {
      addHeroi(newHeroi);
    }
    resetForm();
  };

  const handleCancelEdit = () => {
    setHeroEdit && setHeroEdit(undefined);
    resetForm();
  }

  const resetForm = () => {
    setNome('');
    setClasse(Classe.Tank);
    setCounters([]);
    setCountered([]);
    setCounterFilter('');
    setCounteredFilter('');
    setGoodMaps([]);
    resetGoodMapsForm();
    setBadMaps([]);
    resetBadMapsForm();
  };

  const resetGoodMapsForm = () => {
    setTipoGoods('')
    setMapaGoods(undefined);
    setPosGoods('')
    setSubGoods('')
    setAliadoPGoods([]);
    setAliadoPGoodsFilter('');
    setAliadoOGoods([]);
    setAliadoOGoodsFilter('');
    setCounterGoods([]);
    setCounterGoodsFilter('');
  };

  const resetBadMapsForm = () => {
    setTipoBad('');
    setMapaBad(undefined);
    setPosBad('');
    setSubBad('');
    setAliadoPBad([]);
    setAliadoOBadFilter('');
    setAliadoOBad([]);
    setAliadoOBadFilter('');
    setCounteredBad([]);
    setCounteredBadFilter('');
  };

  const handleAddGoodMaps = () => {
    if(!tipoGoods || !mapaGoods || (!posGoods && !subGoods)) return

    const gameStatus:GameStatusPlus = {
      tipo: tipoGoods,
      mapa: mapaGoods,
      ...(posGoods && { posicao: posGoods }),
      ...(subGoods && { submapa: subGoods }),
      ...(aliadoPGoods && { aliadoPlus: aliadoPGoods }),
      ...(aliadoOGoods && { aliadoOb: aliadoOGoods }),
      ...(counterGoods && { specifCounter: counterGoods }),
    }

    setGoodMaps((prev) => (prev.concat(gameStatus)))

    resetGoodMapsForm();
  }

  const handleAddBadMaps = () => {
    if(!tipoBad || !mapaBad || (!posBad && !subBad)) return

    const gameStatus:GameStatusDown = {
      tipo: tipoBad,
      mapa: mapaBad,
      ...(posBad && { posicao: posBad }),
      ...(subBad && { submapa: subBad }),
      ...(aliadoPBad && { aliadoDown: aliadoPBad }),
      ...(aliadoOBad && { aliadoObDown: aliadoOBad }),
      ...(counteredBad && { specifCountered: counteredBad }),
    }

    setBadMaps((prev) => (prev.concat(gameStatus)))

    resetBadMapsForm();
  }

  const handleCounterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !counters.some((h) => h.nome === heroi.nome));;
    
    setCounters((prev) => (selectedOptions.concat(prev)));
  };

  const handleCounteredSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !countered.some((h) => h.nome === heroi.nome));;
    
    setCountered((prev) => (selectedOptions.concat(prev)));
  };

  const handleGoodAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !aliadoPGoods.some((h) => h.nome === heroi.nome));;
    
    setAliadoPGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleObrigatorAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !aliadoOGoods.some((h) => h.nome === heroi.nome));;
  
    setAliadoOGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleGoodCounterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !counterGoods.some((h) => h.nome === heroi.nome));;

    setCounterGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleBadAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !aliadoPBad.some((h) => h.nome === heroi.nome));

    setAliadoPBad((prev) => (selectedOptions.concat(prev)));
  };

  const handleObrigatorBadAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !aliadoOBad.some((h) => h.nome === heroi.nome));
    
    setAliadoOBad((prev) => (selectedOptions.concat(prev)));
  };

  const handleBadCounteredSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    ).filter((heroi) => !counteredBad.some((h) => h.nome === heroi.nome));

    setCounteredBad((prev) => (selectedOptions.concat(prev)));
  };

  const handleEditGoodMap = (index: number, goodMap: GameStatusPlus) => {
    setEditingGoodMap(index)

    setTipoGoods(goodMap.tipo);
    setMapaGoods(goodMap.mapa);
    setPosGoods(goodMap.posicao || '');
    setSubGoods(goodMap.submapa || '');
    setAliadoPGoods(goodMap.aliadoPlus || []);
    setAliadoOGoods(goodMap.aliadoOb || []);
    setCounterGoods(goodMap.specifCounter || []);
  }

  const handleEditBadMap = (index: number, badMap: GameStatusDown) => {
    setEditingBadMap(index)

    setTipoBad(badMap.tipo);
    setMapaBad(badMap.mapa);
    setPosBad(badMap.posicao || '');
    setSubBad(badMap.submapa || '');
    setAliadoPBad(badMap.aliadoDown || []);
    setAliadoOBad(badMap.aliadoObDown || []);
    setCounteredBad(badMap.specifCountered || []);
  }

  const handleCancelEditGoodMaps = (e: React.FormEvent) => {
    e.preventDefault();

    setEditingGoodMap(undefined);
    resetGoodMapsForm();
  };

  const handleCancelEditBadMaps = (e: React.FormEvent) => {
    e.preventDefault();

    setEditingBadMap(undefined);
    resetBadMapsForm();
  };

  const handleSubmitGoodMapsEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingGoodMap == undefined) return
    handleAddGoodMaps();

    const row = goodMaps;
    row.splice(editingGoodMap, 1);
    setEditingGoodMap(undefined);
    setGoodMaps(row);
  };

  const handleSubmitBadMapsEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingBadMap == undefined) return
    handleAddBadMaps();
    
    const row = badMaps;
    row.splice(editingBadMap, 1);
    setEditingBadMap(undefined);
    setBadMaps(row);
  };

  const removeCounter = (heroi: Heroi) => {
    setCounters(counters.filter((h) => h.nome !== heroi.nome));
  };

  const removeCountered = (heroi: Heroi) => {
    setCountered(countered.filter((h) => h.nome !== heroi.nome));
  };

  const removeGoodAlly = (heroi: Heroi) => {
    setAliadoPGoods(aliadoPGoods.filter((h) => h.nome !== heroi.nome));
  };

  const removeObrigatorAlly = (heroi: Heroi) => {
    setAliadoOGoods(aliadoOGoods.filter((h) => h.nome !== heroi.nome));
  };

  const removeSpecfCounter = (heroi: Heroi) => {
    setCounterGoods(counterGoods.filter((h) => h.nome !== heroi.nome));
  };

  const removeBadAlly = (heroi: Heroi) => {
    setAliadoPBad(aliadoPGoods.filter((h) => h.nome !== heroi.nome));
  };

  const removeObrigatorBadAlly = (heroi: Heroi) => {
    setAliadoOBad(aliadoOGoods.filter((h) => h.nome !== heroi.nome));
  };

  const removeSpecfCountered = (heroi: Heroi) => {
    setCounteredBad(counteredBad.filter((h) => h.nome !== heroi.nome));
  };

  const filteredCounters = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counterFilter.toLowerCase())
  );

  const filteredCountered = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counteredFilter.toLowerCase())
  );

  const filteredGoodAllys = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(aliadoPGoodsFilter.toLowerCase())
  );

  const filteredObrigatorAllys = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(aliadoOGoodsFilter.toLowerCase())
  );

  const filteredSpecCounter = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counterGoodsFilter.toLowerCase())
  );

  const filteredBadAllys = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(aliadoPBadFilter.toLowerCase())
  );

  const filteredObrigatorBadAllys = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(aliadoOBadFilter.toLowerCase())
  );

  const filteredSpecCountered = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counteredBadFilter.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ref={ref}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Classe:
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value as Classe)}
            required
          >
            {Object.values(Classe).map((classeOption) => (
              <option key={classeOption} value={classeOption}>
                {classeOption}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
        <div style={{minWidth: "20rem"}} >
          <h3>Counter de:</h3>
          <FilterInput
            type="text"
            value={counterFilter}
            onChange={(e) => setCounterFilter(e.target.value)}
            placeholder="Hero"
          />
          <SelectMulti
            multiple
            value={counters.map((counter) => counter.nome)}
            onChange={handleCounterSelect}
          >
            {filteredCounters.map((heroi) => (
              <option key={heroi.nome} value={heroi.nome}>
                {heroi.nome}
              </option>
            ))}
          </SelectMulti>
          <SelectedItemsContainer>
            {counters.map((heroi) => (
              <SelectedItem key={heroi.nome}>
                {heroi.nome}
                <RemoveButton type="button" onClick={() => removeCounter(heroi)}>
                  X
                </RemoveButton>
              </SelectedItem>
            ))}
          </SelectedItemsContainer>
        </div>
        <div style={{minWidth: "20rem"}}>
          <h3>Counterado por:</h3>
          <FilterInput
            type="text"
            value={counteredFilter}
            onChange={(e) => setCounteredFilter(e.target.value)}
            placeholder="Hero"
          />
          <SelectMulti
            multiple
            value={countered.map((counter) => counter.nome)}
            onChange={handleCounteredSelect}
          >
            {filteredCountered.map((heroi) => (
              <option key={heroi.nome} value={heroi.nome}>
                {heroi.nome}
              </option>
            ))}
          </SelectMulti>
          <SelectedItemsContainer>
            {countered.map((heroi) => (
              <SelectedItem key={heroi.nome}>
                {heroi.nome}
                <RemoveButton type="button" onClick={() => removeCountered(heroi)}>
                  X
                </RemoveButton>
              </SelectedItem>
            ))}
          </SelectedItemsContainer>
        </div>
      </div>
      <div>
          <h3>Bons Mapas</h3>
          {goodMaps.length > 0 && 
            <GameStatusTable>
              <thead> 
                <tr>
                  <th>
                    tipo
                  </th>
                  <th>
                    mapa
                  </th>
                  <th>
                    submapa
                  </th>
                  <th>
                    posição
                  </th>
                  <th>
                    aliados bons
                  </th>
                  <th>
                    aliados obrigatórios
                  </th>
                  <th>
                    counter especifico
                  </th>
                  <th>
                    editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {goodMaps.map((gm, i) => (
                  <tr>
                    <td>
                      {gm.tipo}
                    </td>
                    <td>
                      {gm.mapa.nome}
                    </td>
                    {gm.submapa ? 
                      <td>
                        {gm.submapa}
                      </td>
                      :
                      <td>---</td>  
                    }
                    {gm.posicao ? 
                      <td>
                        {gm.posicao}
                      </td>
                      :
                      <td>---</td>
                    }
                    {gm.aliadoPlus ? 
                      <td>
                        <div style={{overflowY:"scroll", maxHeight: "5rem"}}>
                          {gm.aliadoPlus.map((al) => (
                            <p>

                              {al.nome}
                            </p>
                          ))}
                        </div>
                      </td>
                      :
                      <td>---</td>
                    }
                    {gm.aliadoOb ? 
                      <td>
                        <div style={{overflowY:"scroll", maxHeight: "5rem"}}>
                        {gm.aliadoOb.map((al) => (
                          <p>
                            {al.nome}
                          </p>
                        ))}
                        </div>
                      </td>
                      :
                      <td>---</td>
                    }
                    {gm.specifCounter ? 
                      <td>
                        <div style={{overflowY:"scroll", maxHeight: "5rem"}}>
                          {gm.specifCounter.map((al, i) => (
                            <p>
                              {al.nome}
                            </p>
                          ))}
                        </div>
                      </td>
                      :
                      <td>---</td>
                    }
                    <td>
                      <button type="button" onClick={() => handleEditGoodMap(i, gm)}>Editar</button>
                    </td>
                  </tr>
                ))}                
              </tbody>
            </GameStatusTable>
          }
          <select
            value={tipoGoods}
            onChange={(e) => {setTipoGoods(e.target.value); setPosGoods(''); setSubGoods('');}}
            style={{ margin:"1rem 1rem 1rem 8rem"}}
          >
            <option value="">Selecione um tipo de jogo</option>
            {state.tipoJogo.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          {tipoGoods &&
            <select
              value={mapaGoods?.nome}
              onChange={(e) => setMapaGoods(state.mapas.find((mapa) => mapa.nome == e.target.value))}
              style={{ margin:"1rem 1rem 1rem 1rem"}}
              required
            >
              <option value="">Selecione um mapa</option>
              {state.mapas.filter((mapa) => mapa.tipo == tipoGoods).map((mapa, index) => (
                <option key={index} value={mapa.nome}>
                  {mapa.nome}
                </option>
              ))}
            </select>
          }
          {mapaGoods &&
            <>
              {
                mapaGoods.tipo == "Domination" ?
                (
                  <select
                    value={subGoods}
                    onChange={(e) => setSubGoods(e.target.value)}
                    style={{ margin:"1rem 1rem 1rem 1rem"}}
                    required
                  >
                    <option value="">Selecione um submapa</option>
                    {mapaGoods.submapa && 
                      mapaGoods.submapa.map((mapa, index) => (
                        <option key={index} value={mapa}>
                          {mapa}
                        </option>
                    ))}
                  </select>
                )
                :
                (
                  <select
                    value={posGoods}
                    onChange={(e) => setPosGoods(e.target.value)}
                    style={{ margin:"1rem 1rem 1rem 1rem"}}
                    required
                  >
                    <option value="">Selecione uma posição</option>
                    {mapaGoods.posicao && 
                      mapaGoods.posicao.map((pos, index) => (
                        <option key={index} value={pos}>
                          {pos}
                        </option>
                    ))}
                  </select>
                )
              }
            </>
          }
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            <div style={{minWidth: "20rem"}}>
              <h5>Bons Aliados</h5>
              <FilterInput
                type="text"
                value={aliadoPGoodsFilter}
                onChange={(e) => setAliadoPGoodsFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={aliadoPGoods.map((ali) => ali.nome)}
                onChange={handleGoodAllySelect}
              >
                {filteredGoodAllys.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {aliadoPGoods.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeGoodAlly(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
          
            <div style={{minWidth: "20rem"}}>
              <h5>Aliados Obrigatórios</h5>
              <FilterInput
                type="text"
                value={aliadoOGoodsFilter}
                onChange={(e) => setAliadoOGoodsFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={aliadoOGoods.map((ali) => ali.nome)}
                onChange={handleObrigatorAllySelect}
              >
                {filteredObrigatorAllys.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {aliadoOGoods.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeObrigatorAlly(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
            <div style={{minWidth: "20rem"}}>
              <h5>Counter específico de</h5>
              <FilterInput
                type="text"
                value={counterGoodsFilter}
                onChange={(e) => setCounterGoodsFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={counterGoods.map((ali) => ali.nome)}
                onChange={handleGoodCounterSelect}
              >
                {filteredSpecCounter.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {counterGoods.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeSpecfCounter(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
          </div>
          {editingGoodMap == undefined ?
            (
              <AddButton type="button" onClick={() => handleAddGoodMaps()}>
                +
              </AddButton>
            ) :
            (
              <>
                <AddButton type="button" onClick={(e) => handleSubmitGoodMapsEdit(e)}>
                  ✔
                </AddButton>
                <AddButton type="button" onClick={(e) => handleCancelEditGoodMaps(e)}>
                  X
                </AddButton>
              </>
            )
          }
          
          
      </div>
      <div>
          <h3>Mapas Ruins</h3>
          {badMaps.length > 0 && 
            <GameStatusTable>
              <thead> 
                <tr>
                  <th>
                    tipo
                  </th>
                  <th>
                    mapa
                  </th>
                  <th>
                    submapa
                  </th>
                  <th>
                    posição
                  </th>
                  <th>
                    aliados ruins
                  </th>
                  <th>
                    aliados ruins obrigatórios
                  </th>
                  <th>
                    counterado especifico
                  </th>
                  <th>
                    editar
                  </th>
                </tr>
              </thead>
              <tbody>
                
                  {badMaps.map((gm, i) => (
                    <tr>
                      <td>
                        {gm.tipo}
                      </td>
                      <td>
                        {gm.mapa.nome}
                      </td>
                      {gm.submapa ? 
                        <td>
                          {gm.submapa}
                        </td>
                        :
                        <td>---</td>                         
                      }
                      {gm.posicao ?
                        <td>
                          {gm.posicao}
                        </td>
                        :
                        <td>---</td>  
                      }
                      {gm.aliadoDown ? 
                          <td>
                            <div style={{overflowY:"scroll", maxHeight: "5rem"}}>
                              {gm.aliadoDown.map((al) => (
                                <p>
                                  {al.nome}
                                </p>
                              ))}
                            </div>
                          </td>
                        :
                        <td>---</td>  
                      }
                      {gm.aliadoObDown ? 
                          <td>
                            <div style={{overflowY:"scroll", maxHeight: "5rem"}}>
                            {gm.aliadoObDown.map((al) => (
                              <p>
                                {al.nome}
                              </p>
                            ))}
                            </div>
                          </td>
                        :
                        <td>---</td>  
                      }
                      {gm.specifCountered ? 
                          <td>
                            <div style={{overflowY:"scroll", maxHeight: "5rem"}}>

                            {gm.specifCountered.map((al) => (
                              <p>
                                {al.nome}
                              </p>
                            ))}
                            </div>
                          </td>
                        :
                        <td>---</td>  
                      }
                      <td>
                        <button type="button" onClick={() => handleEditBadMap(i, gm)}>Editar</button>
                      </td>
                    </tr>
                  ))}
                
              </tbody>
            </GameStatusTable>
          }
          <select
            value={tipoBad}
            onChange={(e) => {setTipoBad(e.target.value); setPosBad(''); setSubBad(''); }}
            style={{ margin:"1rem 1rem 1rem 8rem"}}
          >
            <option value="">Selecione um tipo de jogo</option>
            {state.tipoJogo.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          {tipoBad &&
            <select
              value={mapaBad?.nome}
              onChange={(e) => setMapaBad(state.mapas.find((mapa) => mapa.nome == e.target.value))}
              style={{ margin:"1rem 1rem 1rem 1rem"}}
              required
            >
              <option value="">Selecione um mapa</option>
              {state.mapas.filter((mapa) => mapa.tipo == tipoBad).map((mapa, index) => (
                <option key={index} value={mapa.nome}>
                  {mapa.nome}
                </option>
              ))}
            </select>
          }
          {mapaBad &&
            <>
              {
                mapaBad.tipo == "Domination" ?
                (
                  <select
                    value={subBad}
                    onChange={(e) => setSubBad(e.target.value)}
                    style={{ margin:"1rem 1rem 1rem 1rem"}}
                    required
                  >
                    <option value="">Selecione um submapa</option>
                    {mapaBad.submapa && 
                      mapaBad.submapa.map((mapa, index) => (
                        <option key={index} value={mapa}>
                          {mapa}
                        </option>
                    ))}
                  </select>
                )
                :
                (
                  <select
                    value={posBad}
                    onChange={(e) => setPosBad(e.target.value)}
                    style={{ margin:"1rem 1rem 1rem 1rem"}}
                    required
                  >
                    <option value="">Selecione uma posição</option>
                    {mapaBad.posicao && 
                      mapaBad.posicao.map((pos, index) => (
                        <option key={index} value={pos}>
                          {pos}
                        </option>
                    ))}
                  </select>
                )
              }
            </>
          }
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            <div style={{minWidth: "20rem"}}>
              <h5>Aliados Ruins</h5>
              <FilterInput
                type="text"
                value={aliadoPBadFilter}
                onChange={(e) => setAliadoPBadFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={aliadoPBad.map((ali) => ali.nome)}
                onChange={handleBadAllySelect}
              >
                {filteredBadAllys.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {aliadoPBad.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeBadAlly(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
            <div style={{minWidth: "20rem"}}>
              <h5>Aliados Obrigatórios</h5>
              <FilterInput
                type="text"
                value={aliadoOBadFilter}
                onChange={(e) => setAliadoOBadFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={aliadoOBad.map((ali) => ali.nome)}
                onChange={handleObrigatorBadAllySelect}
              >
                {filteredObrigatorBadAllys.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {aliadoOBad.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeObrigatorBadAlly(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
            <div style={{minWidth: "20rem"}}>
              <h5>Counterado específico por</h5>
              <FilterInput
                type="text"
                value={counteredBadFilter}
                onChange={(e) => setCounteredBadFilter(e.target.value)}
                placeholder="Hero"
              />
              <SelectMulti
                multiple
                value={counteredBad.map((ali) => ali.nome)}
                onChange={handleBadCounteredSelect}
              >
                {filteredSpecCountered.map((heroi) => (
                  <option key={heroi.nome} value={heroi.nome}>
                    {heroi.nome}
                  </option>
                ))}
              </SelectMulti>
              <SelectedItemsContainer>
                {counteredBad.map((heroi) => (
                  <SelectedItem key={heroi.nome}>
                    {heroi.nome}
                    <RemoveButton type="button" onClick={() => removeSpecfCountered(heroi)}>
                      X
                    </RemoveButton>
                  </SelectedItem>
                ))}
              </SelectedItemsContainer>
            </div>
          </div>
          {editingBadMap == undefined ?
            (
              <AddButton type="button" onClick={() => handleAddBadMaps()}>
                +
              </AddButton>
            ) :
            (
              <>
                <AddButton type="button" onClick={(e) => handleSubmitBadMapsEdit(e)}>
                  ✔
                </AddButton>
                <AddButton type="button" onClick={(e) => handleCancelEditBadMaps(e)}>
                  X
                </AddButton>
              </>
            )
          }
      </div>
      {heroiToEdit ? (
        <>  
          <button style={{ margin:"5rem 5rem 5rem 5rem", background:'#1fff'}} type="submit">Editar Herói</button>
          <button style={{ margin:"5rem 5rem 5rem 5rem", background:'#f11f'}} onClick={() => {handleCancelEdit()}}>Cancelar edição</button>
        </>
      ) : (
        <button style={{ margin:"5rem 5rem 5rem 5rem", background:'#1fff'}} type="submit">Adicionar Herói</button>
      )}
      
    </form>
  );
};