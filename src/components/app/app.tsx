import React from 'react';
import './app.sass';
import Poker from "../poker/poker";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <Poker />
      </div>
    </div>
  );
};

export default App;
