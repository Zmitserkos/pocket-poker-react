import React from 'react';

const PokerKey: React.FC = (props) => {
  return (
    <button className="poker-key">
      {props.children}
    </button>
  );
};

export default PokerKey;
