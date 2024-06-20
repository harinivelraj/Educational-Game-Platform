// client/src/components/ModuleSelector.js
import React, { useState } from 'react';
import Game from './Game';

const ModuleSelector = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  return (
    <div>
      {!selectedModule ? (
        <div>
          <h1>Select a Module</h1>
          <button onClick={() => handleModuleSelect('nutrition')}>Nutrition</button>
          <button onClick={() => handleModuleSelect('yoga')}>Yoga</button>
        </div>
      ) : (
        <Game module={selectedModule} />
      )}
    </div>
  );
};

export default ModuleSelector;
