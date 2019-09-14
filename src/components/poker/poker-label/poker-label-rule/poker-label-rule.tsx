import React from 'react';
import {Winning} from '../../../../enums/winning.enum';

interface PokerLabelRuleProps {
  description: string;
  win: Winning;
}

const PokerLabelRule: React.FC<PokerLabelRuleProps> = (props) => {
  const {description, win} = props;

  return (
    <div className="poker-label-rule">
      <span>{description}</span>
      <span>{win}</span>
    </div>
  );
};

export default PokerLabelRule;
