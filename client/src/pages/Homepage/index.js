import React from 'react';

const Homepage = () => {
  return (
    <main id="homepage" className="container">
      <h1>Trivia Quack</h1>
      <img className="planet-left" src="../../images/planet-1.png" alt="Blue Planet" />
      <img className="planet-right" src="../../images/planet-2.png" alt="Orange Planet" />
      <div className="text-center">
      <a className="new-game-button">New Game</a>
      <a className="join-game-button">Join Game</a>
      </div>
    </main>
  );
};

export default Homepage;