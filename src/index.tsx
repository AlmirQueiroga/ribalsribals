import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/Context';
import { theme } from './styles';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GameProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GameProvider>
  </React.StrictMode>
);

