import React from 'react';
import './App.scss';
import SocketWrapper from './features/socket/SocketWrapper';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['JetBrains Mono'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SocketWrapper />
      </div>
    </ThemeProvider>
  );
}

export default App;
