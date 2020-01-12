import React from 'react';
import './poker-key.sass';
import { PokerKeyProps } from '../../../../interfaces/poker-key-props';

const PokerKey: React.FC<PokerKeyProps> = (props: PokerKeyProps) => {
  return (
    <button
      className={`poker-key ${props.disabled ? '-disabled' : ''}`}
      onClick={props.clickHandle}
    >
      {props.children}
    </button>
  );
};

export default PokerKey;
