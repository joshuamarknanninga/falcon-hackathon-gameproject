// src/components/BattleLog.jsx
import React from 'react';

const BattleLog = ({ log }) => {
  return (
    <div className="battle-log">
      <h2>Battle Log</h2>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default BattleLog;
