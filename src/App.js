import React from 'react';
import './App.scss';
import Board from './features/chess/board/Board';

function App() {
  return (
    <div className="App">
      <div className="App-page-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
