import React from 'react';
import PokerLabelRule from './poker-label-rule/poker-label-rule';
import {Winning} from '../../../enums/winning.enum'

const PokerLabel: React.FC = () => {
  return (
    <div className="poker-label">
      <div className="list">
        <PokerLabelRule description="Stright Flush" win={Winning.StrightFlush} />
        <PokerLabelRule description=" Four Of Kind" win={Winning.FourOfKind} />
        <PokerLabelRule description=" Full House" win={Winning.FullHouse} />
        <PokerLabelRule description=" Flush" win={Winning.Flush} />
      </div>

      <div className="list">
        <PokerLabelRule description=" Stright" win={Winning.Stright} />
        <PokerLabelRule description=" Three Of Kind" win={Winning.ThreeOfKind} />
        <PokerLabelRule description=" Two Pair" win={Winning.TwoPair} />
        <PokerLabelRule description=" Jacks Or Better" win={Winning.JacksOrBetter} />
      </div>
    </div>
  );
};

export default PokerLabel;
