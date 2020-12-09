import React from 'react';
import './App.scss';
import SocketWrapper from './features/socket/SocketWrapper';

function App() {
  return (
    <div className="App">
      <SocketWrapper />
    </div>
  );
}

export default App;
