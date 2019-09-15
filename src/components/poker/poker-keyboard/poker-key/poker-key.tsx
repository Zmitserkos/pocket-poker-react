import React from 'react';
import './poker-key.sass';

export interface PokerKeyData {
  disabled?: boolean;
  clickHandle?: any;
}

const PokerKey: React.FC<PokerKeyData> = (props) => {
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
