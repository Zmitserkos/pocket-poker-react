import React from 'react';
import PokerCard from './poker-card/poker-card';
import './poker-screen.sass';
import {Card} from "../../../entities/card";

export interface PokerScreen {
  isSwitchedOn: boolean;
  isGameOver: boolean;
  isWin: boolean;
  isHoldOrDraw: boolean;
  score: number;
  cards: Card[];
}

const PokerScreen: React.FC<PokerScreen> = ({isSwitchedOn, isGameOver, isWin, isHoldOrDraw, score, cards}) => {
  const holdOrDrawElement = isHoldOrDraw ? <span className="hold-or-draw">HOLD or DRAW</span> : null;
  const gameOverElement = isGameOver ? <span className="game-over">GAME OVER</span> : null;
  const winElement = isWin ? <span className="win">WIN</span> : null;
  const cardElements = cards.map(card => <div className="card"><PokerCard card={card} /></div>);
  const pokerScreenContentElement = isSwitchedOn ? (
    <React.Fragment>
      <div className="header">
        {holdOrDrawElement}
        {gameOverElement}
        {winElement}
        <span className="score">{score}</span>
      </div>

      <div className="main">
        {cardElements}
      </div>
    </React.Fragment>
  ) : null;

  return (
    <div className="poker-screen">
      {pokerScreenContentElement}
    </div>
  );
};

export default PokerScreen;
