import React, { useState, useContext } from 'react';
import { GameContext } from '../../context/Context';
import { Heroi, Classe, GameStatusPlus, GameStatusDown, Mapa } from '../../types/types';
import { SelectContainer, SelectButton, OptionsList, OptionItem, SelectedItemsContainer, SelectedItem, RemoveButton, SelectMulti, FilterInput, AddButton } from './style';

export const AddHeroiForm: React.FC = () => {
  const { state, addHeroi } = useContext(GameContext);
  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState<Classe>(Classe.Tank);
  const [counters, setCounters] = useState<Heroi[]>([]);
  const [countera, setCountera] = useState<Heroi[]>([]);
  const [counterFilter, setCounterFilter] = useState('');
  const [counteraFilter, setCounteraFilter] = useState('');
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
  const [counterBad, setCounterBad] = useState<Heroi[]>([]);
  const [counteredBadFilter, setCounteredBadFilter] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHeroi: Heroi = {
      nome,
      classe,
      ...(counters && { counters: counters }),
      ...(countera && { countera: countera }),
      ...(goodMaps && { goodMaps: goodMaps }),
      ...(badMaps && { badMaps: badMaps }),
      // counters: counters.length > 0 ? counters : undefined,
      // countera: countera.length > 0 ? countera : undefined,
    };

    addHeroi(newHeroi);
    resetForm();
  };

  const resetForm = () => {
    setNome('');
    setClasse(Classe.Tank);
    setCounters([]);
    setCountera([]);
    setCounterFilter('');
    setCounteraFilter('');
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
    setPosGoods('')
    setSubGoods('')
    setAliadoPGoods([])
    setAliadoOGoods([])
    setCounterGoods([])
  }

  const handleAddBadMaps = () => {
    if(!tipoBad || !mapaBad || (!posBad && !subBad)) return

    const gameStatus:GameStatusDown = {
      tipo: tipoBad,
      mapa: mapaBad,
      ...(posBad && { posicao: posBad }),
      ...(subBad && { submapa: subBad }),
      ...(aliadoPBad && { aliadoPlus: aliadoPBad }),
      ...(aliadoOBad && { aliadoOb: aliadoOBad }),
      ...(counterBad && { specifCountered: counterBad }),
    }

    setBadMaps((prev) => (prev.concat(gameStatus)))
    setPosBad('')
    setSubBad('')
    setAliadoPBad([])
    setAliadoOBad([])
    setCounterBad([])
  }

  const handleCounterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setCounters((prev) => (selectedOptions.concat(prev)));
  };

  const handleCounteraSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setCountera((prev) => (selectedOptions.concat(prev)));
  };

  const handleGoodAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setAliadoPGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleObrigatorAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setAliadoOGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleGoodCounterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setCounterGoods((prev) => (selectedOptions.concat(prev)));
  };

  const handleBadAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setAliadoPBad((prev) => (selectedOptions.concat(prev)));
  };

  const handleObrigatorBadAllySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setAliadoOBad((prev) => (selectedOptions.concat(prev)));
  };

  const handleBadCounteredSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => state.herois.find((h) => h.nome === option.value)!
    );
    setCounterBad((prev) => (selectedOptions.concat(prev)));
  };

  const removeCounter = (heroi: Heroi) => {
    setCounters(counters.filter((h) => h.nome !== heroi.nome));
  };

  const removeCountera = (heroi: Heroi) => {
    setCountera(countera.filter((h) => h.nome !== heroi.nome));
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
    setCounterBad(counterBad.filter((h) => h.nome !== heroi.nome));
  };

  const filteredCounters = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counterFilter.toLowerCase())
  );

  const filteredCountera = state.herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(counteraFilter.toLowerCase())
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
      <div>
        <h3>Counters (Heróis que o counteram):</h3>
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
      <div>
        <h3>Countera (Heróis que ele countera):</h3>
        <FilterInput
          type="text"
          value={counteraFilter}
          onChange={(e) => setCounteraFilter(e.target.value)}
          placeholder="Hero"
        />
        <SelectMulti
          multiple
          value={countera.map((counter) => counter.nome)}
          onChange={handleCounteraSelect}
        >
          {filteredCountera.map((heroi) => (
            <option key={heroi.nome} value={heroi.nome}>
              {heroi.nome}
            </option>
          ))}
        </SelectMulti>
        <SelectedItemsContainer>
          {countera.map((heroi) => (
            <SelectedItem key={heroi.nome}>
              {heroi.nome}
              <RemoveButton type="button" onClick={() => removeCountera(heroi)}>
                X
              </RemoveButton>
            </SelectedItem>
          ))}
        </SelectedItemsContainer>
      </div>
      <div>
          <h3>Bons Mapas</h3>
          {goodMaps && 
            <table>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  {goodMaps.map((gm) => (
                    <>
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
                        <td/>  
                      }
                      {gm.posicao ? 
                        <td>
                          {gm.posicao}
                        </td>
                        :
                        <td/>
                      }
                      {gm.aliadoPlus ? 
                        <td>
                          <div style={{overflow:"scroll", maxHeight: "5rem"}}>
                            {gm.aliadoPlus.map((al) => (
                              <p>

                                {al.nome}
                              </p>
                            ))}
                          </div>
                        </td>
                        :
                        <td/>
                      }
                      {gm.aliadoOb ? 
                        <td>
                          <div style={{overflow:"scroll", maxHeight: "5rem"}}>
                          {gm.aliadoOb.map((al) => (
                            <p>
                              {al.nome}
                            </p>
                          ))}
                          </div>
                        </td>
                        :
                        <td/>
                      }
                      {gm.specifCounter ? 
                        <td>
                          <div style={{overflow:"scroll", maxHeight: "5rem"}}>
                            {gm.specifCounter.map((al) => (
                              <p>
                                {al.nome}
                              </p>
                            ))}
                          </div>
                        </td>
                        :
                        <td/>
                      }
                    </>
                  ))}
                </tr>
              </tbody>
            </table>
          }
          <select
            value={tipoGoods}
            onChange={(e) => {setTipoGoods(e.target.value); setPosGoods(''); setSubGoods('');}}
            required
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
            <div>
              {
                mapaGoods.nome == "Domination" ?
                (
                  <select
                    value={subGoods}
                    onChange={(e) => setSubGoods(e.target.value)}
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
            </div>
          }
          <div>
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
          <div>
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
          <div>
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
          <AddButton type="button" onClick={() => handleAddGoodMaps()}>
            +
          </AddButton>
      </div>
      <div>
          <h3>Mapas Ruins</h3>
          {badMaps && 
            <table>
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
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  {badMaps.map((gm) => (
                    <>
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
                        <td/>                         
                      }
                      {gm.posicao ?
                        <td>
                          {gm.posicao}
                        </td>
                        :
                        <td/>  
                      }
                      {gm.aliadoDown ? 
                          <td>
                            <div style={{overflow:"scroll", maxHeight: "5rem"}}>
                              {gm.aliadoDown.map((al) => (
                                <p>
                                  {al.nome}
                                </p>
                              ))}
                            </div>
                          </td>
                        :
                        <td/>  
                      }
                      {gm.aliadoObDown ? 
                          <td>
                            <div style={{overflow:"scroll", maxHeight: "5rem"}}>
                            {gm.aliadoObDown.map((al) => (
                              <p>
                                {al.nome}
                              </p>
                            ))}
                            </div>
                          </td>
                        :
                        <td/>  
                      }
                      {gm.specifCountered ? 
                          <td>
                            <div style={{overflow:"scroll", maxHeight: "5rem"}}>

                            {gm.specifCountered.map((al) => (
                              <p>
                                {al.nome}
                              </p>
                            ))}
                            </div>
                          </td>
                        :
                        <td/>  
                      }
                    </>
                  ))}
                </tr>
              </tbody>
            </table>
          }
          <select
            value={tipoBad}
            onChange={(e) => {setTipoBad(e.target.value); setPosBad(''); setSubBad(''); }}
            required
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
            <div>
              {
                mapaBad.nome == "Domination" ?
                (
                  <select
                    value={subBad}
                    onChange={(e) => setSubBad(e.target.value)}
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
            </div>
          }
          <div>
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
          <div>
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
          <div>
            <h5>Counterado específico por</h5>
            <FilterInput
              type="text"
              value={counteredBadFilter}
              onChange={(e) => setCounteredBadFilter(e.target.value)}
              placeholder="Hero"
            />
            <SelectMulti
              multiple
              value={counterBad.map((ali) => ali.nome)}
              onChange={handleBadCounteredSelect}
            >
              {filteredSpecCountered.map((heroi) => (
                <option key={heroi.nome} value={heroi.nome}>
                  {heroi.nome}
                </option>
              ))}
            </SelectMulti>
            <SelectedItemsContainer>
              {counterBad.map((heroi) => (
                <SelectedItem key={heroi.nome}>
                  {heroi.nome}
                  <RemoveButton type="button" onClick={() => removeSpecfCountered(heroi)}>
                    X
                  </RemoveButton>
                </SelectedItem>
              ))}
            </SelectedItemsContainer>
          </div>
          <AddButton type="button" onClick={() => handleAddBadMaps()}>
            +
          </AddButton>
      </div>
      <button type="submit">Adicionar Herói</button>
    </form>
  );
};