import React, { useState, useEffect, useRef } from 'react';
import TextTransition, { presets } from 'react-text-transition';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const CombatLog = ({ combatLog }) => {
  const [index, setIndex] = useState(0);

  useInterval(() => {
    if (index < combatLog.length - 1) {
      setIndex(index + 1);
    }
  }, 2000);

  return (
    <h1>
      <TextTransition
        text={combatLog[index % combatLog.length]}
        springConfig={presets.wobbly}
      />
    </h1>
  );
};

export default CombatLog;
