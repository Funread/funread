import React from 'react';
import './CharactersComponent.scss'; // Asumiendo que tienes un archivo SASS para estilos

const CharactersComponent = () => {
  return (
    <div className="container text-center">
      <h2 className="characters-title">Characters</h2>
      <div className="row">
        <div className="col-sm-4">
          <div className="character-card">
            <img src="path_to_luis_image" alt="Luis" className="character-image" />
            <h3 className="character-name">LUIS</h3>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="character-card">
            <img src="path_to_marcos_image" alt="Marcos" className="character-image" />
            <h3 className="character-name">MARCOS</h3>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="character-card">
            <img src="path_to_carlos_image" alt="Carlos" className="character-image" />
            <h3 className="character-name">CARLOS</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersComponent;
