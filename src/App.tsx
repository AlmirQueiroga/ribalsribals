import React, { useContext, useState } from 'react';
import { GameContext, GameProvider } from './context/Context';
import { AddHeroiForm } from './components/HeroPage';
import { HeroiList } from './components/HeroiList';
import { Container, Header, Title, Button, Tabs, TabButton, TabContent } from './styles';
import { AddFormacaoForm } from './components/AddFormacaoForm';
import { AddGameModeForm } from './components/AddGameModeForm';
import { AddMapaForm } from './components/AddMapaForm';
import { ContextDisplay } from './components/ContextDisplay';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'gameMode' | 'mapa' | 'form'>('hero');
  const { saveToJson, loadFromJson } = useContext(GameContext);

  return (
    <Container>
      <Header>
        <Title>Ribals Ribals</Title>
        <div>
          <Button onClick={saveToJson}>Salvar JSON</Button>
          <Button onClick={loadFromJson}>Carregar JSON</Button>
        </div>
      </Header>
      <Tabs>
        <TabButton
          active={activeTab === 'hero'}
          onClick={() => setActiveTab('hero')}
        >
          Add Heroi
        </TabButton>
        <TabButton
          active={activeTab === 'gameMode'}
          onClick={() => setActiveTab('gameMode')}
        >
          Add GameMode
        </TabButton>
        <TabButton
          active={activeTab === 'mapa'}
          onClick={() => setActiveTab('mapa')}
        >
          Add Mapa
        </TabButton>
        <TabButton
          active={activeTab === 'form'}
          onClick={() => setActiveTab('form')}
        >
          Add Formação
        </TabButton>
      </Tabs>
      <TabContent>
        {activeTab === 'hero' && (
          <>
            <AddHeroiForm />
            <HeroiList />
          </>
        )}
        {activeTab === 'gameMode' && (
          <>
            <AddGameModeForm />
          </>
        )}
        {activeTab === 'mapa' && (
          <>
            <AddMapaForm />
          </>
        )}
        {activeTab === 'form' && (
          <>
            <AddFormacaoForm />
          </>
        )}
      </TabContent>
      <ContextDisplay />
    </Container>
  );
};
    

export default App;